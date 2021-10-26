const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const rateLimit = require("express-rate-limit");


const { NODE_ENV, ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT} = require('./configs/config');
// const startCrone = require('./cron/index');

const ErrorHandler = require('./errors/ErrorHandler');
const checkIsUserAdmin = require('./util/default-data.util');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: _configureCors}));
app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));


if (NODE_ENV === 'dev') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

const { authRouter, userRouter } = require('./routes');

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    checkIsUserAdmin();
    // startCrone();
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }
    const whitelist = ALLOWED_ORIGIN.split(';');
    if (whitelist.includes(origin)) {
        return callback(new ErrorHandler('CORS is hot allowed'), false);
    }
    return callback(null, true);
}
