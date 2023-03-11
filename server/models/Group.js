const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupName: String,
    description: String,
     posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    image: {type: String},
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;