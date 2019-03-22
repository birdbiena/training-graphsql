const express = require('express');
const router = express.Router();

const { graphql } = require('graphql');
const schema = require('./../data/schema');

router.route('/').post((req, res) => {
    graphql(schema, req.body).then(data => {
        res.json({code: 1, data: data, msg: 'success'}).end();
    });
});

// curl -v -XPOST -H 'Content-Type:application/graphql' -d 'query UserQuery { info(id: 8) { username, mobile, createtime } }' http://localhost:3000/graphql

module.exports = router;
