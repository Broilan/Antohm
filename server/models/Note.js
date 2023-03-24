const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;