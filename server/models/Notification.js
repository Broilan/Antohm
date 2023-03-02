const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
   from: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
   to: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
   likeCommentOrFollow: {
    type: String
   },
   content: {
    type: String
   },
   postID: {type: mongoose.Schema.Types.ObjectId,ref: 'Post' },
   viewed: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;