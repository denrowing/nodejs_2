const User = require('../dataBase/User');
const {userNormalizator} = require('../util/user.util');
const { jwtService } = require('../servise');

module.exports = {

    login: (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);
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

};
