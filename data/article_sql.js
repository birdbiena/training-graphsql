module.exports = {
    article_info: {
        insert: `INSERT INTO snail.article_info (title, describe, content, login_id) VALUES (?, ?, ?, ?)`,
        delete: 'DELETE FROM snail.article_info WHERE 1=1 AND id=?',
        update: 'UPDATE snail.article_info SET title=?, describe=?, content=? WHERE id=?',

        update_sate: `UPDATE snail.article_info SET state=? WHERE id=?`,

        queryById: `SELECT * FROM snail.article_info WHERE 1=1 AND id=?`,
        queryByAll: `SELECT * FROM snail.article_info WHERE 1=1 AND state=?`
    }
};
