const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
   from: {
    type: String
   }, 
   to: {
    type: String
   }, 
   likeCommentOrFollow: {
    type: String
   },
   content: {
    type: String
   },
   postID: {
    type: String
   },
   viewed: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;