const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
    bookmarkTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    bookmarkFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;