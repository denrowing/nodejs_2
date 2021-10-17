const jwt = require('jsonwebtoken');
const ErrorHandler = require("../errors/error.handler");

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, 'xxx', { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, 'zzz', { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: async (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? 'xxx' : 'zzz';

            await jwt.verify(token, secret);
        } catch(e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
