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
  'http://localhost:5173', // Vite dev server (adjust if different)
  // optional
  'https://movie-database-api-zpam.vercel.app', // deployed frontend (no trailing slash)
  // add any other exact origins here
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
// ensure preflight uses same options
app.options('*', cors(corsOptions));

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
