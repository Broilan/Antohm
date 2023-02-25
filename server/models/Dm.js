const mongoose = require('mongoose');
const { Schema } = mongoose;

const dmSchema = new Schema({
    UserID: String,
    otherUserId: String,
    messages: Array,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Dm = mongoose.model('Dm', dmSchema);

module.exports = Dm;