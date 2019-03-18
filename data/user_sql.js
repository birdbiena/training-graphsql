module.exports = {
    insert: 'INSERT INTO user(username, mobile, email, address, age, sex, avatar) VALUES(?, ?, ?, ?, ?, ?, ?)',
    delete: 'DELETE FROM user WHERE id=?',
    update: 'UPDATE user SET name=?, age=? WHERE id = ?',
    queryAll: 'SELECT * FROM snail.user',
    queryById: 'SELECT * FROM user WHERE id=?',

    login: `SELECT * FROM snail.user_login WHERE 1=1 AND login_name=?`,

    findById: `SELECT * FROM snail.user_login WHERE 1=1 AND id=?`,
    findByName: `SELECT * FROM snail.user_login WHERE 1=1 AND login_name=?`

};
