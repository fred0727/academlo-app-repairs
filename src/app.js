const express = require('express');
const userRouters = require('./routes/user.route');
const repairRouters = require('./routes/repair.route');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v2/users', userRouters);
app.use('/api/v2/repairs', repairRouters);

// Validando Ruta
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't fin ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
