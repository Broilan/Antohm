const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    UserID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    group: String,
    content: String,
    likes: Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookmarks'
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;