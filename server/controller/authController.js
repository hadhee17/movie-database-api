const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

// Generate JWT
const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}d`, // e.g. "7d"
  });
};

// Send JWT via cookie + response
const createResponseToken = (user, statusCode, res) => {
  const token = jwtToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, // cannot access in JS
    secure: false,
    sameSite: 'lax', // ✅ required for cross-site cookies
    secure: process.env.NODE_ENV === 'production', // ✅ only on HTTPS
  };

  res.cookie('jwt', token, cookieOptions);

  // hide password
  user.password = undefined;

  res.status(statusCode).json({
    status: 'Success',
    token,
    data: { user },
  });
};

// ---------------- AUTH CONTROLLERS ----------------

// Signup
exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    createResponseToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createResponseToken(user, 200, res);
};

// Logout
exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ status: 'success' });
};

// Protect routes (middleware)
exports.protect = async (req, res, next) => {
  let token;

  // 1) Get token from headers or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // 2) No token found
  if (!token) {
    return next(new AppError('You are not logged in to get access', 401));
  }

  try {
    // 3) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 4) Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists', 401),
      );
    }

    // 5) Check if user changed password after token was issued
    if (currentUser.changePasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password. Please login again', 401),
      );
    }

    // 6) Grant access
    req.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

// Role restriction middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

// Forgot password
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't request this, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset request (valid 10 min)',
      message,
    });

    res.status(200).json({
      status: 'Success',
      message: 'Password reset link sent to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Please try again later.',
        500,
      ),
    );
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    createResponseToken(user, 200, res);
  } catch (error) {
    next(new AppError('Error resetting password: ' + error.message, 500));
  }
};
