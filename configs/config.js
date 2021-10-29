module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 5001,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'zzz',

    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    AWS_SE_REGION:process.env.AWS_SE_REGION,
    AWS_S3_NAME:process.env.AWS_S3_name,
    AWS_S3_ACCESS_KEY:process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY:process.env.AWS_S3_SECRET_KEY
};
