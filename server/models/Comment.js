const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');

const { Schema } = mongoose;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    replies: [{
        text: {
            type: String,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        likes: {
            type: Number,
            default: 0
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp)
    },
    likes: {
        type: Number,
        default: 0,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
