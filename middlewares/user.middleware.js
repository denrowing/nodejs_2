const User = require('../dataBase/User');
const userValidator = require('../validator/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});
            if (userByEmail) {
                throw new Error('Email already exists');
            }
            next();
        } catch (e) {
            res.json(e.message);
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
            res.json(e.message);
        }

    }
};
