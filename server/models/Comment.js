const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    commentTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    commentFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    postID: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;