const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    releaseDate: {
      type: Date,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    overview: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

movieSchema.index({ genres: 1 });

movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id',
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
