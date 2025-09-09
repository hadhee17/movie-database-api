const ReviewModel = require('../models/reviewModel');

const handlerFactory = require('./handlerFactory');

exports.createReview = async (req, res, next) => {
  if (!req.body.movie) req.body.movie = req.params.movieId;

  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await ReviewModel.create(req.body);

  res.status(201).json({
    Status: 'Success',
    result: newReview.length,
    data: {
      newReview,
    },
  });
};

exports.getAllReview = async (req, res, next) => {
  let filter = {};
  if (req.params.movieId) filter = { movie: req.params.movieId };

  const review = await ReviewModel.find(filter);

  res.status(200).json({
    Status: 'Success',
    result: review.length,
    data: {
      review,
    },
  });
};

exports.updateReview = handlerFactory.updateOne(ReviewModel);
exports.deleteReview = handlerFactory.deleteOne(ReviewModel);
