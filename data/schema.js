const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString } = require('graphql');

const user = require('./../features/user/service');

let count = 0;

let UserInfo = new GraphQLObjectType({
    name: 'user_info',
    description: 'user_info table',
    fields: {
        id: {
            type: GraphQLInt,
            description: 'user_info id'
        },

        username: {
            type: GraphQLString,
            description: 'user_info username'
        },

        mobile: {
            type: GraphQLString,
            description: 'user_info mobile'
        },

        createtime: {
            type: GraphQLString,
            description: 'user_info createtime'
        }
    }
});

let schema = new GraphQLSchema({
    // query: new GraphQLObjectType({
    //     name: 'RootQueryType',
    //     fields: {
    //         count: {
    //             type: GraphQLInt,
    //             description: "The Count!",
    //             resolve: function () {
    //                 return count;
    //             }
    //         }
    //     }
    // }),
    query: new GraphQLObjectType({
        name: 'UserQuery',
        description: 'user info query!',
        fields: {
            info: {
                type: UserInfo,
                description: 'user info',
                args: {
                    id: {
                        type: GraphQLInt,
                        require: true
                    }
                },
                resolve: async (source, obj) => {
                    return (await user.queryById(obj.id))[0];
                }
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            updateCount: {
                type: GraphQLInt,
                description: "Mutation Count!",
                resolve: function() {
                    count += 1;
                    return count;
                }
            }
        }
    })
});

module.exports = schema;
