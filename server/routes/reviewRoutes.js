const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const Router = express.Router({ mergeParams: true });

Router.route('/get-review/:id').get(reviewController.getReviewById);
Router.route('/create-review').post(
  authController.protect,
  authController.restrictTo('user'),
  reviewController.createReview,
);
Router.route('/get-all-review').get(reviewController.getAllReview);
Router.patch('/update-review/:id', reviewController.updateReview);
Router.route('/delete-review/:id').delete(reviewController.deleteReview);

module.exports = Router;
