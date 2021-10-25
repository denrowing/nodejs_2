const User = require('../dataBase/User');
const { ADMIN } = require('../configs/user-roles.enum');


module.exports = async () => {
    const user = await User.findOne({role: ADMIN});

    if (!user) {
      await User.createUserWithHashPassword({
            name: 'Alyona',
            email: 'alyina.admin@site.com',
            password: 'QwerT!212@',
            role: ADMIN
        });
    }
};
