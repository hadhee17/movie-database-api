const userModel = require('../models/usersModel');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const filterObj = function (obj, ...field) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (field.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllusers = async (req, res, next) => {
  const user = await userModel.find();

  res.status(200).json({
    status: 'Success',
    result: user.length,
    data: {
      user,
    },
  });
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'Cannot update password here.Only for updating email and name',
        400,
      ),
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  console.log(filteredBody);

  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 'Success',
    data: {
      user: updatedUser,
    },
  });
};

exports.getMe = async (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getUser = factory.getOne(userModel);
exports.deleteMe = factory.deleteOne(userModel);
