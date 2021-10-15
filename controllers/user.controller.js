const User = require('../dataBase/User');
const passwordService = require('../servise/password.servise');
const userUtil = require('../util/user.util');


module.exports = {

    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            console.log('_______*********______');
            console.log(user);
            console.log('_______*********_______');

            const normalizedUser = userUtil.userNormalizator(user);

            console.log('_______normalizedUser______');
            console.log(normalizedUser);
            console.log('_______normalizedUser_______');

            res.json(normalizedUser);
        } catch(e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            console.log('******************');
            console.log(req.user);
            console.log('******************');

            const hashedPassword = await passwordService.hash(req.body.password);

            console.log('******************');
            console.log(hashedPassword);
            console.log('******************');


            const newUser = await User.create({...req.body, password: hashedPassword});
            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    compareUser: async (req, res) => {
        try {
            // const {email, login} = req.params;
            const findByEmail = await User.find(req.body.email);
            const findByPassword = await User.find(req.body.password);
            if (findByEmail || findByPassword) {
                res.json('Your enter to system');
            } else {
                throw new Error('No find such login or password');
            }
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: (req, res) => {
        res.json('UPDATE USER');
    }
};
