module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 5001,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'xxx',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'zzz',
};
