const User = require('../dataBase/User');
const O_Auth = require('../dataBase/O_Auth');
const ActionToken = require('../dataBase/ActionToken');
const { userNormalizator } = require('../util/user.util');
const { jwtService, emailService} = require('../servise');
const ErrorHandler = require('../errors/ErrorHandler');
const actionTokenTypeEnum = require('../configs/action-token-type.enum');
const EmailActionEnum = require('../configs/email-actions.enum');


module.exports = {

    login: async (req, res, next) => {
        try {
            const { user } = req;

            await user.comparePassword(req.body.password);

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });

        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new ErrorHandler('User not found', 404);
            }

            const actionToken = jwtService.generateActionToken(actionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: actionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, { forgotPasswordUrl:
                    `https://localhost:3000/passwordForgot?token=${actionToken}` });

            res.json('OK');
        } catch (e) {
            next(e);
        }
    },
};
