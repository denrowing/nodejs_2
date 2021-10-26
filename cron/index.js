const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove.job');

module.exports = () => {
    cron.schedule('* * * * * *', () => {
        console.log('Cron start at', new Date().toISOString());
        removeOldTokens();
        console.log('Cron finished at', new Date().toISOString());
    });
};
