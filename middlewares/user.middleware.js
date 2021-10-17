const User = require('../dataBase/User');
const userValidator = require('../validator/user.validator');
const ErrorHandler = require("../errors/error.handler");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email}).select('+password');
            if (userByEmail) {
                return next({
                    message: 'Email already exist',
                    status: 404
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler('Wrong email or password', 418);
                // return next({
                //     message: 'Wrong email or password',
                //     status: 404
                // })
            }

            req.user = userByEmail;

            next();
        } catch(e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            // const {name, email, password } = req.body;
            // if(!name || !email || !password) {
            //     throw new Error('Some fields are empty');
            // }
            //
            // if(email.includes('@')) {
            //
            // }

            const { error, value } = userValidator.createUserValidator.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }

    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            console.log('_________________________');
            console.log(role);
            console.log('_________________________');

            if (!roleArr.includes(role)) {
                throw new Error('Access denied');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
