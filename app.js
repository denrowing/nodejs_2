const express = require('express');
const mongoose = require('mongoose');

const {MONGO_CONNECT_URL, PORT} = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const useRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

app.use('/users', useRouter);
app.use('/auth/login', authRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
