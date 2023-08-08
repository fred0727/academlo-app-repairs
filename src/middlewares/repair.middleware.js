const Repair = require('../models/repair.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateStatusRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return next(new AppError(`Repair with id ${id} not found!`, 400));
  }
  console.log(id);
  req.repair = repair;
  next();
});
