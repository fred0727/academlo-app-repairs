const express = require('express');
const repairController = require('../controllers/repair.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');
const router = express.Router();

router.use(authMiddleware.protect);
router
  .route('/')
  .post(
    validationMiddleware.createRepairValidation,
    repairController.createRepair
  );

router.use(authMiddleware.restricTo('employee'));
router.route('/').get(repairController.findAllRepairs);

router
  .use('/:id', repairMiddleware.validateStatusRepair)
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
