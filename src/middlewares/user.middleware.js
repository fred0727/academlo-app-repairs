const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateCreateUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(200).json({
      status: 'warning',
      message: 'Not created, the email already exists',
    });
  }

  next();
});

exports.validateEditeUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(200).json({
      status: 'warning',
      message: 'Not update, the email already exists',
    });
  }

  next();
});

exports.validateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError(`User with id ${id} not found!`, 400));
  }
  req.user = user;
  next();
});
