const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const useRouter = require('./routes/user.router');

app.use('/users', useRouter);

app.listen(5001, () => {
    console.log(`App listen 5001`);
});
