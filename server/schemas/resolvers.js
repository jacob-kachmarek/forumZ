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
        },
        addForum: async (parent, { title, description, userID }, context) => {
            // console.log(context.user);
            const forum = await Forum.create({
                title,
                description,
                createdBy: userID,
            });
            console.log(forum._id)
            await User.findOneAndUpdate(
                { _id: userID },
                { $addToSet: { forums: [forum._id] } }
            );
            return forum;
        },

        // This kind of works, updates the database but the query is strange, also explicitly codes what forum to add to.
        // Didn't want to push it not working so i commented out my work feel free to use delete change etc.

        // addPost: async (parent, { title, description, userID }, context) => {
        //     const post = await Post.create({
        //         title,
        //         description,
        //         createdBy: userID
        //     });
        //     await User.findOneAndUpdate(
        //         { _id: userID },
        //         { $addToSet: { posts: post._id } }
        //     );
        //     await Forum.findOneAndUpdate(
        //         { _id: "64fb9f2b90bf09a705a3ff26" },
        //         { $addToSet: { posts: post._id } }
        //     );
        //     return post;
        // }
        // addComment: async (parent, { text, userID, postID }, context) => {
        //     const comment = await Comment.create({
        //         text,
        //         createdBy: userID
        //     });
        //     await User.findOneAndUpdate(
        //         { _id: userID },
        //         { $addToSet: { comments: comment._id } }
        //     )
        //     await Post.findOneAndUpdate(
        //         { _id: postID },
        //         { $addToSet: { comments: comment._id } }
        //     )
        // }
    }
}

module.exports = resolvers;