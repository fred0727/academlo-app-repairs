const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Found Repairs',
    repairs,
  });
});

exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Found Repair',
    repair,
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { date, motorsNumber, description } = req.body;
  const { id } = req.sessionUser;

  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId: id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Service created successfully',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'completed',
  });

  return res.status(200).json({
    status: 'succes',
    message: 'Repair update successfully',
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'cancelled',
  });

  return res.status(200).json({
    status: 'success',
    message: 'Repair delete successfully',
  });
});

exports.pendingServices = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  if (!repairs) {
    return next(new AppError('Repairs pending not found'));
  }

  return res.status(200).json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});

exports.completedServices = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'completed',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  if (!repairs) {
    return next(new AppError('Repairs completed not found'));
  }

  return res.status(200).json({
    status: 'success',
    results: repairs.length,
    repairs,
  });
});
