const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    group: String,
    message: String,
    likes: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    postID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;