const express = require('express');
const router = express.Router();
// const graphql = require('graphql').graphql;
const schema = require('./../data/schema');

var graphqlHTTP = require('express-graphql');

// router.use(bodyParser.text({ type: 'application/graphql' }));
// router.route('/').post((req, res) => {
//     graphql(schema, req.body).then(data => {
//         if (data.errors) {
//             return res.json({code: 0, data: [], msg: data.errors.toString()}).end();
//         }

//         return res.json({code: 1, data: data.data, msg: 'success'}).end();
//     });
// });

router.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true,
    pretty: false
}));

module.exports = router;
