const mongoose = require('mongoose');

const reviewShema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Review must have a rating'],
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Review must belong to a movie'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Users',
      required: [true, 'Review must belong to a user'],
    },
  },
  { timestamps: true },
);

reviewShema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'movie',
  //     select: 'title',
  //   })
  this.populate({
    path: 'movie',
    select: 'title',
  });
  next();
});

const Review = mongoose.model('Review', reviewShema);
module.exports = Review;
