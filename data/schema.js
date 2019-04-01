const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const _ = require('lodash');
const user = require('./../features/user/service');

let UserInfo = new GraphQLObjectType({
    name: 'user_info',
    description: '用户信息表',
    fields: {
        id: {
            type: GraphQLString,
            description: 'id'
        },

        username: {
            type: GraphQLString,
            description: 'username'
        },

        mobile: {
            type: GraphQLString,
            description: 'mobile'
        },

        email: {
            type: GraphQLString,
            description: 'email'
        },

        address: {
            type: GraphQLString,
            description: 'address'
        },

        age: {
            type: GraphQLInt,
            description: 'age'
        },

        sex: {
            type: GraphQLInt,
            description: 'sex'
        },

        avatar: {
            type: GraphQLString,
            description: 'avatar'
        },

        login_id: {
            type: GraphQLString,
            description: 'login_id'
        }
    }
});

const UserInfoInput = new GraphQLInputObjectType({
    name: 'UserInfoInput',
    description: '用户信息输入module',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        mobile: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        address: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        sex: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        avatar: {
            type: new GraphQLNonNull(GraphQLString)
        },
        login_id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'UserQuery',
        description: 'user info query!',
        fields: {
            user: {
                type: UserInfo,
                description: 'user info',
                args: {
                    id: {
                        type: GraphQLString,
                        require: true
                    }
                },
                resolve: async (source, obj) => {
                    return (await user.queryById(obj.id))[0];
                }
            },

            users: {
                type: new GraphQLList(UserInfo),
                description: '全部用户信息',
                resolve: async () => {
                    return (await user.queryAll());
                }
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'UserMutation',
        description: '用户信息表CURD',
        fields: {
            addUser: {
                type: UserInfo,
                description: '普通添加用户信息',
                args: {
                    username: { type: GraphQLString },
                    mobile: { type: GraphQLString },
                    email: { type: GraphQLString },
                    address: { type: GraphQLString },
                    age: { type: GraphQLInt },
                    sex: { type: GraphQLInt },
                    avatar: { type: GraphQLString },
                    login_id: { type: GraphQLString }
                },
                resolve: (source, params) => {
                    return user.add(_.values(params));
                }
            },

            addUserType: {
                type: UserInfo,
                description: '对象添加用户信息',
                args: {
                    userInfo: { type: UserInfoInput }
                },
                resolve: (source, userInfo) => {
                    return user.add(_.values(userInfo.userInfo));
                }
            },

            delete: {
                type: UserInfo,
                description: 'Delete Users',
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: async (source, { id }) => {
                    return (await user.delete(id));
                }
            }
        }
    })
});

module.exports = schema;
