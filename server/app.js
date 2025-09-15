const express = require('express');
const movieRoute = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const globalErrorController = require('./controller/errorController');
const AppError = require('./utils/AppError');
const qs = require('qs');
const cors = require('cors');
const app = express();

app.set('query parser', (str) => qs.parse(str));
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000', // local Vite dev server
  'https://your-frontend.vercel.app', // deployed frontend
];
app.use(
  cors({
    origin: allowedOrigins, // allow your frontend
    credentials: true,
  }),
);

app.use('/api/v1/movies', movieRoute);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/review', reviewRoute);

app.all('/*catchall', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorController);
module.exports = app;
