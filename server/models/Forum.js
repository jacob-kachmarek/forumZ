const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const forumSchema = new Schema({
    title: {
        type: String,
        required: true,
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
        default: Date.now
    }
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;