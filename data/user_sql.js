module.exports = {
    user_info: {
        insert: `INSERT INTO snail.user_info(id, username, mobile, email, address, age, sex, avatar, login_id) VALUES(upper(replace(uuid(),'-','')), ?, ?, ?, ?, ?, ?, ?, ?)`,
        delete: `UPDATE snail.user_info SET status=0 WHERE id=?`,
        update: `UPDATE snail.user_info SET username=?, mobile=?, email=?, address=?, age=?, sex=?, avatar=? WHERE id=?`,
        queryAll: `SELECT * FROM snail.user_info WHERE 1=1 AND status=1`,
        queryById: `SELECT * FROM snail.user_info WHERE 1=1 AND status=1 AND id=?`,
    },

    user_login: {
        insert: `INSERT INFO snail.user_login(id, login_name, password, state) VALUES(upper(replace(uuid(),'-','')), ?, ?, ?)`,
        login: `SELECT * FROM snail.user_login WHERE 1=1 AND login_name=?`,
        queryById: `SELECT * FROM snail.user_login WHERE 1=1 AND id=?`,
        queryByName: `SELECT * FROM snail.user_login WHERE 1=1 AND login_name=?`
    },

    user_address: {

    }
};
