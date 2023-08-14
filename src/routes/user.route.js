const express = require('express');
const userController = require('../controllers/user.controller');
const validateMiddleware = require('../middlewares/validation.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authMiddleware.protect);
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
  .patch(
    authMiddleware.protectAccountOwner,
    userMiddleware.validateEditeUser,
    userController.updateUser
  )
  .delete(authMiddleware.protectAccountOwner, userController.deleteUser);

module.exports = router;
