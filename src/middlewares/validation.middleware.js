const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email, is required')
    .isEmail()
    .withMessage('Email must be a corret format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a lost 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have contain a one letter'),
  validFields,
];

exports.createRepairValidation = [
  body('date').notEmpty().withMessage('Date is required'),
  body('motorsNumber').notEmpty().withMessage('MotorsNumber is required'),
  body('description')
    .notEmpty()
    .withMessage('Description must have contain a one letter'),
  validFields,
];
