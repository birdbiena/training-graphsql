const express = require('express');
const router = express.Router();

const todoService = require('./../features/todo/service');

router.route('/')
    .get((req, res) => {
        // todoService.queryAll().then(data => {
        //     res.json(data);
        // });
        res.json(todoService.queryAll());
    });

module.exports = router;
