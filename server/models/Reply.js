const mongoose = require('mongoose');
const formatDate = require('../utils/formatDate');

const { Schema } = mongoose;

const replySchema = new Schema({
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
        default: Date.now,
        get: (timestamp) => formatDate(timestamp)

    },
    likes: {
        type: Number,
        default: 0
    }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;