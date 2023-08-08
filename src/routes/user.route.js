const express = require('express');
const userController = require('../controllers/user.controller');
const validateMiddleware = require('../middlewares/validation.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(
    validateMiddleware.createUserValidation,
    userMiddleware.validateCreateUser,
    userController.createUser
  );

router.route('/login').post(userController.loginUser);

router
  .use('/:id', userMiddleware.validateUser)
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userMiddleware.validateEditeUser, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
