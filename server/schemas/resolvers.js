const { User, Comment, Forum, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            return User.findOne({ username: args.username })
                .populate({ path: 'forums', populate: { path: 'posts', populate: { path: 'comments'} } })
                .populate({ path: 'posts', populate: { path: 'comments'} })
                .populate({ path: 'comments'})
        },
        getUsers: async (parent, args, context) => {
            return User.find()
                .populate({ path: 'forums', populate: { path: 'posts', populate: { path: 'comments'} } })
                .populate({ path: 'posts', populate: { path: 'comments'} })
                .populate({ path: 'comments'})
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
        addPost: async (parent, { title, description, userID, forumID }, context) => {
            const post = await Post.create({
                title,
                description,
                createdBy: userID
            });
            await User.findOneAndUpdate(
                { _id: userID },
                { $push: { posts: post._id } }
            );
            await Forum.findOneAndUpdate(
                { _id: forumID },
                { $push: { posts: post._id } }
            );
            return post;
        },
        addComment: async (parent, { text, userID, postID }, context) => {
            const comment = await Comment.create({
                text,
                createdBy: userID
            });
            await User.findOneAndUpdate(
                { _id: userID },
                { $addToSet: { comments: comment._id } }
            )
            await Post.findOneAndUpdate(
                { _id: postID },
                { $addToSet: { comments: comment._id } }
            )
            return comment;
        },
        addReply: async (parent, { text, commentID }, context) => {
            const reply = await Comment.findOneAndUpdate(
                {_id: commentID},
                { $push:  { replies: {text} }},
                {new: true}
            )
            return reply;
        },
        updateForum: async (parent, { title, description, forumID }, context) => {
            const update = {};

            if (title) {
              update.title = title;
            }
          
            if (description) {
              update.description = description;
            }

            if (Object.keys(update).length === 0) {
              return null;
            }
          
            const forum = await Forum.findOneAndUpdate(
              { _id: forumID },
              update,
              { new: true }
            );
          
            return forum;
        },
          

    }
}

module.exports = resolvers;

