const express = require('express');
const movieController = require('../controller/movieController');
const authController = require('../controller/authController');
const reviewRoute = require('./reviewRoutes');

const Router = express.Router();

Router.route('/highest-rated').get(
  movieController.getHighestRated,
  movieController.getAllMovies,
);
Router.route('/get-movie/:title').get(movieController.getOneMovie);

Router.route('/get-by-genre/:genre').get(movieController.getMovieByGenre);
Router.route('/top-genres').get(movieController.TopGenres);

Router.route('/movie/:id').get(movieController.getMovie);
Router.route('/all-movies').get(movieController.getAllMovies);
Router.route('/delete-movie/:id').delete(
  authController.protect,
  authController.restrictTo('admin'),
  movieController.deleteMovie,
);

// re-routing using reviewRouter for moview review
Router.use('/:movieId', reviewRoute);
Router.use('/:movieId', reviewRoute);

module.exports = Router;
