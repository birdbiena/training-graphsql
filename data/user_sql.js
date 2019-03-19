module.exports = {
    user_info: {
        insert: 'INSERT INTO snail.user_info(username, mobile, email, address, age, sex, avatar, login_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
        delete: 'DELETE FROM snail.user_info WHERE 1=1 AND id=?',
        update: 'UPDATE snail.user_info SET name=?, age=? WHERE id = ?',
        queryAll: 'SELECT * FROM snail.user_info',
        queryById: 'SELECT * FROM snail.user_info WHERE 1=1 AND id=?',
    },

    user_login: {
        login: `SELECT * FROM snail.user_login WHERE 1=1 AND login_name=?`,
        queryById: `SELECT * FROM snail.user_login WHERE 1=1 AND id=?`,
        queryByName: `SELECT * FROM snail.user_login WHERE 1=1 AND login_name=?`
    },

    user_address: {

    }
};
