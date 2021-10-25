const cron = require('node-cron');

module.exports = () => {
    cron.schedule('* * * * * *', () => {
        console.log('Cron start at', new Date().toISOString());
        console.log('START');
        console.log('Cron finished at', new Date().toISOString());
    });
};
