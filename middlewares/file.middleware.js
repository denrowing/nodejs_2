const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require("../configs/constants");
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    chechUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;
            if(!avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = avatar;
            if(!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(`Not supported format`, 400);
            }
            if(size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(`File ${name} is too big`, 400);
            }
            next();
        } catch(e) {
            next(e);
        }
    }
};
