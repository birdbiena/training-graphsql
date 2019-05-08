const express = require('express');
const router = express.Router();

const userService = require('./../features/user/service');

router
    .route('/')
    .get((req, res) => {
        userService.queryAll().then(data => {
            res.json(data).end();
        });
    })
    .post(function(req, res) {
        userService.add(req.query).then(data => {
            res.json(data);
        });
    });

router
    .route('/:user_id')
    .get((req, res) => {
        userService.queryById([req.params.user_id]).then(data => {
            res.json(data);
        });
    })
    .put((req, res) => {
        userService.update(req.query, req.params.user_id).then(data => {
            res.json(data);
        });
    })
    .delete((req, res) => {
        // delete
        var test = {
            type: 'DELETE',
            params: req.params,
            query: req.query
        };

        userService.delete(req.params.user_id).then(data => {
            test.result = data;
            res.json(test);
        });
    });

module.exports = router;
