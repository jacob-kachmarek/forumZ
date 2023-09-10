const { User, Comment, Forum, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            return User.findOne({ username: args.username })
                .populate({ path: 'forums', populate: { path: 'posts', populate: { path: 'comments' } } })
                .populate({ path: 'posts', populate: { path: 'comments' } })
                .populate({ path: 'comments' })
        },
        getUsers: async (parent, args, context) => {
            return User.find()
                .populate({ path: 'forums', populate: { path: 'posts', populate: { path: 'comments' } } })
                .populate({ path: 'posts', populate: { path: 'comments' } })
                .populate({ path: 'comments' })

        },
        getForums: async () => {
            return Forum.find().populate('createdBy');
        },
        getPostsByForum: async (parent, { forumID }) => {
            return await Post.find({ forum: forumID }).populate('createdBy');
          }
    },
    Mutation: {
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, password }, context) => {
            console.log(username, password)
            const user = await User.create({ username, password });
            console.log(user)
            const token = signToken(user);
            console.log(token)
            return { token, user };
        },
        addForum: async (parent, { title, description, userID }, context) => {
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
        addPost: async (parent, { title, description, image, userID, forumID }, context) => {
            const post = await Post.create({
                title,
                description,
                image,
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
                { _id: commentID },
                { $push: { replies: { text } } },
                { new: true }
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
        updatePost: async (parent, { title, description, postID }, context) => {
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
            const post = await Post.findOneAndUpdate(
                { _id: postID },
                update,
                { new: true }
            );

            return post;
        },
        updateComment: async (parent, { text, commentID }, context) => {
            if (text.length == 0) {
                return null;
            }
            const comment = await Comment.findOneAndUpdate(
                { _id: commentID },
                { text: text },
                { new: true }
            );
            return comment;
        },
        updateReply: async (parent, { text, replyID, commentID }, context) => {
            if (text.length === 0) {
                return null;
            }
            const comment = await Comment.findOne({ _id: commentID });
            if (!comment) {
                return null;
            }
            const updatedComment = comment.toObject();
            const updatedReplies = updatedComment.replies.map((reply) => {
                if (reply._id.toString() === replyID) {
                    return { ...reply, text: text };
                }
                return reply;
            });
            updatedComment.replies = updatedReplies;
            const result = await Comment.findOneAndUpdate(
                { _id: commentID },
                updatedComment,
                { new: true }
            );

            return result;
        },
        deleteForum: async (parent, { forumID }, context) => {
            const forum = await Forum.findByIdAndDelete(
                { _id: forumID }
            );
            return forum;
        },
        deletePost: async (parent, { postID }, context) => {
            const post = await Post.findByIdAndDelete(
                { _id: postID }
            );
            return post;
        },
        deleteComment: async (parent, { commentID }, context) => {
            const comment = await Comment.findByIdAndDelete(
                { _id: commentID }
            );
            return comment;
        },
        deleteReply: async (parent, { commentID, replyID }, context) => {
            const comment = await Comment.findOneAndUpdate(
                { _id: commentID },
                { $pull: { replies: { _id: replyID } } },
                { new: true }
            );
            return comment;
        }
    }
}

module.exports = resolvers;

