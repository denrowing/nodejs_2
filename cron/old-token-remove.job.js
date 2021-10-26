const dayJs = require('dayjs');
const O_Auth = require('../dataBase/O_Auth');
const utc = require('dayjs/plugin/utc');


dayJs.extend(utc);

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');

    const deleteInfo = await O_Auth.deleteMany({
        createdAt: { $lt: previousMonth}
    });

    console.log(deleteInfo);
};
