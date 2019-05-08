const express = require('express');
const router = express.Router();

const todoService = require('./../features/todo/service');

router
    .route('/')
    .get((req, res) => {
        todoService.findALl(req.session.passport.user).then(data => {
            res.json({ code: 1, data: data, msg: 'success' });
        });
    })
    .post((req, res) => {
        todoService.add(Object.values(req.body)).then(data => {
            res.json({ code: 1, data: req.body, msg: 'success' });
        });
    });

router
    .route('/:id')
    .put((req, res) => {
        todoService.update(req.body, req.params.id).then(data => {
            res.json({ code: 1, data: [], msg: 'success' });
        });
    })
    .delete((req, res) => {
        todoService.remove(req.params.id).then(data => {
            res.json({
                code: 1,
                data: req.params.id,
                msg: 'success'
            });
        });
    });

module.exports = router;
