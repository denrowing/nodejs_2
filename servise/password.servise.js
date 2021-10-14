const bcrypt = require('bcrypt');
const {genSalt} = require("bcrypt");

module.exports = {
    hash: (password) => {
       return bcrypt.hash(password, 10)
    },
    compare: async (password, hashPassword) => {
        const isPasswordatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordatched) {
            throw new Error('Wrong email or password');
        }
    }
};
