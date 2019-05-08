module.exports = {
    todo: {
        insert: `INSERT INTO snail.todo(id, description, status, user_login_id) VALUES(upper(replace(uuid(),'-','')), ?, ?, ?)`,
        inserts: `INSERT INTO snail.todo SET ?`,
        remove: `UPDATE snail.todo SET status=-1 WHERE id=?`,
        update: `UPDATE snail.todo SET description=?, status=? WHERE id=?`,
        findOne: `SELECT * FROM snail.todo WHERE user_login_id=? AND id=?`,
        findAll: `SELECT * FROM snail.todo WHERE user_login_id=? AND status>-1 ORDER BY create_time ASC`
    }
};
