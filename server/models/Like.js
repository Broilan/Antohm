const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    likeBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likeTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likeOn: {type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;