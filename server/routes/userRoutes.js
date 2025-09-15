const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const Router = express.Router();

Router.route('/signup').post(authController.signup);
Router.route('/login').post(authController.login);
Router.route('/logout').get(authController.logout);
Router.route('/all-users').get(userController.getAllusers);
Router.route('/update-me').patch(
  authController.protect,
  userController.updateMe,
);
Router.delete(
  '/delete-me/:id',
  authController.protect,
  userController.deleteMe,
);
Router.get(
  '/get-Me',
  authController.protect,
  userController.getMe,
  userController.getUser,
);
Router.route('/forgot-password').post(authController.forgotPassword);
Router.route('/reset-password/:token').patch(authController.resetPassword);

module.exports = Router;
