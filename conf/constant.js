const crypto = require('crypto');

module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Thanks123@1.',
        database: 'snail',
        port: 3306
    },
    secret: 'Thanks123@1.',
    salt_rounds: 10,

    MD5_SUFFIX: 'yangpeng4180@sina.com',
    md5: pwd => {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex');
    }
};
