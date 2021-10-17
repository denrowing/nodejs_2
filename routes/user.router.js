const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware= require('../middlewares/user.middleware');


router.get('/', userController.getUsers);

router.get('/:user_id',
    userController.getUserById);

// router.get('/:user_id', userController.getUserByIdJson);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.put('/', userController.updateUser);

// router.delete('/:user_id', userController.deleteUser);

module.exports = router;
