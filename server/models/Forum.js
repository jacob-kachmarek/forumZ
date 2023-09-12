const mongoose = require('mongoose');
import formatDate from '../utils/formatDate';

const { Schema, model } = mongoose;

const forumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp)
    }
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;