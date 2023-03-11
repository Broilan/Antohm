const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resourceBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resourceType: String,
    linkTo: String,
    archived: Boolean,
    post: [{type: mongoose.Schema.Types.ObjectId,ref: 'Post' }],
    image: {type: String},
    date: {
        type: Date,
        default: Date.now()
    }
})

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;