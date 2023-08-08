const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Users found',
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req.params;

  return res.status(200).json({
    status: 'success',
    message: 'Found User',
    user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  return res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req.params;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req.params;

  await user.update({
    status: 'disable',
  });

  return res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
    user,
  });
});

exports.loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Incorret email or password`, 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'Success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
