const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const { authRouter, userRouter } = require('./routes');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', (err, req, res) => {
    res
        .status(err.status || 500)
        .json({
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
