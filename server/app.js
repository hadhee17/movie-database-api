const express = require('express');
const movieRoute = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const globalErrorController = require('./controller/errorController');
const AppError = require('./utils/AppError');
const qs = require('qs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

const allowedOrigins = [
  'https://movie-database-api-zpam.vercel.app/', // local Vite dev server
  // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Handle preflight
app.options('*', cors());

app.set('query parser', (str) => qs.parse(str));
app.use(express.json());

app.use('/api/v1/movies', movieRoute);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/review', reviewRoute);

app.all('/*catchall', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorController);
module.exports = app;
