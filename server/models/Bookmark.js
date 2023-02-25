const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
    UserID: String,
    post: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Post'
    },
    postID: String, 
    marked: Boolean
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;