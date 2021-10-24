const { AUTORIZATION } = require('../configs/constants');
const tokenTypeEnum = require('../configs/token-type.enum');
const { jwtService } = require('../servise');
const verToken = require('../servise/jwt.service');

const ErrorHandler = require('../errors/ErrorHandler');
const O_Auth = require('../dataBase/O_Auth');

module.exports = {

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTORIZATION);
            console.log(token);

            if(!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await jwtService.verifyToken(token);

            const tokenResponce = await O_Auth.findOne({ access_token: token });
            // .populate('user_id');
            console.log('tokenResponcetokenResponcetokenResponcetokenResponce');
            console.log(tokenResponce);
            console.log('tokenResponcetokenResponcetokenResponcetokenResponce');

            if(!tokenResponce) {
                throw new ErrorHandler('Invalid token', 401);
            }

            req.user = tokenResponce.user_id;

            console.log('-----------');
            console.log(tokenResponce);
            console.log('----------');

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTORIZATION);
            console.log(token);

            if(!token) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await verToken.verifyToken(token, tokenTypeEnum.REFRESH);

            // const tokenResponse = await O_Auth
            //     .findOne({ refresh_token: token });
            // .populate('user_id');

            if(!tokenResponce) {
                throw new ErrorHandler('Invalid token', 401);
            }

            await O_Auth.remove({
                refresh_token: token
            });

            req.user = tokenResponce.user_id;

            console.log('-----------');
            console.log(tokenResponce);
            console.log('----------');

            next();
        } catch (e) {
            next(e);
        }
    },

};
