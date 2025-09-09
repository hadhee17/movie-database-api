const movieModel = require('../models/movie');

const Factory = require('./handlerFactory');

exports.getHighestRated = (req, res, next) => {
  const query = new URLSearchParams(req.query);
  query.set('limit', '10'); // for example, limit=10
  query.set('sort', '-rating');

  // Rebuild the URL so Express reparses req.query
  req.url = `${req.path}?${query.toString()}`;
  next();
};

exports.getAllMovies = Factory.getAll(movieModel);

exports.getMovie = Factory.getOne(movieModel, { path: 'reviews' });

exports.deleteMovie = Factory.deleteOne(movieModel);

exports.getOneMovie = async (req, res, next) => {
  const search = req.params.title
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  console.log(search);
  const result = await movieModel.findOne({ title: search });

  res.status(200).json({
    status: 'success',
    result: result.length,
    data: {
      result,
    },
  });
};

exports.TopGenres = async (req, res, next) => {
  const genres = await movieModel.aggregate([
    {
      $unwind: '$genres',
    },
    {
      $group: {
        _id: '$genres',
        avgRating: { $avg: '$rating' },
        movieCount: { $sum: 1 },
      },
    },
    {
      $sort: { avgRating: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id', // genre name
        foreignField: 'genres', // movie's genre array
        as: 'popularMovies',
      },
    },
    {
      $addFields: {
        popularMovies: {
          $slice: [
            { $sortArray: { input: '$popularMovies', sortBy: { rating: -1 } } },
            3,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        genre: '$_id',
        avgRating: 1,
        movieCount: 1,
        popularMovies: { title: 1, rating: 1, overview: 1 },
      },
    },
  ]);
  res.status(200).json({
    status: 'Successs',
    data: {
      genres,
    },
  });
};

exports.getMovieByGenre = async (req, res, next) => {
  const genre =
    req.params.genre.slice(0, 1).toUpperCase() +
    req.params.genre.slice(1).toLowerCase();

  const movies = await movieModel.aggregate([
    { $unwind: '$genres' },
    { $match: { genres: genre } },
  ]);

  res.status(200).json({
    status: 'Successs',
    result: movies.length,
    data: { movies },
  });
};
