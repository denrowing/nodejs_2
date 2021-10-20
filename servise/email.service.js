const nodemailer = require('nodemailer');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../configs/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    },

});


const sendMail = async (userMail) => {
    await transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: 'Hello World!',
        html: 'Hello All World!!!'
    });
};

module.exports = {
    sendMail
};
