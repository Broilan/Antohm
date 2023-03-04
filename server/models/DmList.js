const mongoose = require('mongoose');
const { Schema } = mongoose;

const dmListSchema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dm' }],
})

const DmList = mongoose.model('DmList', dmListSchema);

module.exports = DmList;