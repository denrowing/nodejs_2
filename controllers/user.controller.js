const User = require('../dataBase/User');

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
        const {user_id} = req.params;
        const user = await User.findById(user_id);
        res.json(user);
    },

    createUser: async (req, res) => {
        try {
            console.log('******************');
            console.log(req.body);
            console.log('******************');
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    compareUser: async (req, res) => {
        try {
            // const {email, login} = req.params;
            const findByEmail = await User.find(req.body.email);
            const findByLogin = await User.find(req.body.login);
            if (findByEmail || findByLogin) {
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
