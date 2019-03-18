const express = require('express');
const router = express.Router();

const commentsService = require('./../features/comments/service');

router.route('/:blogid').get((req, res) => {
    let blogid = req.params.blogid;

    commentsService.queryAll(blogid).then(data => {
        res.json(data).end();
    });
});

module.exports = router;
