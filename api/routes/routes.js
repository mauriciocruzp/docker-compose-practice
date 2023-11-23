const router = require('express').Router();
const userController = require('../src/user/userController');

router.route('/user/create').post(userController.create);
router.route('/user/login').post(userController.login);
router.route('/user/search').get(userController.search);
router.route('/user/').get(userController.getAll);
router.route('/user/update').put(userController.update);
router.route('/user/delete').delete(userController.remove);

module.exports = router;