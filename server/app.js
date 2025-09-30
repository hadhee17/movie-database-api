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

app.set('query parser', (str) => qs.parse(str));
const allowedOrigins = [
  'https://movie-database-api-zpam.vercel.app',
  'http://localhost:5173',
  //  // local Vite dev server
  // deployed frontend
];

// Enhanced CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

app.use(express.json());

// Add health check route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from movie database api' });
});

app.use('/api/v1/movies', movieRoute);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/review', reviewRoute);

app.all('/*catchall', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorController);
module.exports = app;
