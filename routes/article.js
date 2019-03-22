const express = require('express');
const router = express.Router();

const articleService = require('./../features/article/service');

router.route('/').get((req, res) => {
    console.log('This is article :', 'req.user');

    let state = 1;

    if (typeof req.params.state !== 'undefined') {
        state = req.params.state;
    }

    articleService.findAll(state).then(data => {
        res.json({code: 1, data, msg: 'done'}).end();
    });
});

router.route('/:article_id').get((req, res) => {
    let _article_id = req.params._article_id;

    articleService.findOne(_article_id).then(data => {
        res.json({ cdoe: 1, data, msg: 'done' }).end();
    });
});

module.exports = router;
