const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const { authMiddleware, userMiddleware } = require("../middlewares");
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post(
    '/',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    // authMiddleware.isPasswordsMatched,
    authController.login
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/logout',
    authController.logout
);

router.post('/password/forgot', authController.sendMailForgotPassword);
router.post('/password/forgot/set', authController.setNewPasswordAfterForgot);

module.exports = router;
