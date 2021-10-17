const passwordService = require('../servise/password.servise');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            await passwordService.compare(password, hashPassword);

            console.log('___________________');
            console.log(password);
            console.log('___________________');


            next();
        } catch (e) {
            next(e);
        }
    },

};
