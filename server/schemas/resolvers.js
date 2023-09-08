const { User, Comment, Forum, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            return User.findOne({ username: args.username })
                .populate({ path: 'forums', populate: { path: 'posts', populate: { path: 'comments', populate: { path: 'favoriteForums' } } } })
                .populate({ path: 'posts', populate: { path: 'comments', populate: { path: 'favoriteForums' } } })
                .populate({ path: 'comments', populate: { path: 'favoriteForums' } })
                .populate('favoriteForums');
        },
        getUsers: async (parent, args, context) => {
            return User.find()
                .populate({ path: 'forums', populate: { path: 'posts', populate: { path: 'comments', populate: { path: 'favoriteForums' } } } })
                .populate({ path: 'posts', populate: { path: 'comments', populate: { path: 'favoriteForums' } } })
                .populate({ path: 'comments', populate: { path: 'favoriteForums' } })
                .populate('favoriteForums');
        }
    },
    Mutation: {
        addUser: async (parent, { username, password }, context) => {
            console.log(username, password)
            const user = await User.create({ username, password });
            console.log(user)
            const token = signToken(user);
            console.log(token)

            return { token, user };
        }
    }
}

module.exports = resolvers;