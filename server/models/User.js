const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {type: String, required: true},
    displayName: {type: String, required: true},
    name: {type: String, reqired: true},
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    savedDates: [{type: mongoose.Schema.Types.ObjectId, ref: 'Calendar'}],
    external_links: [{
        title: {type: String},
        url: {type: String}
    }],
    applications: [{type: String}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    Dms: [{type: Schema.Types.ObjectId, ref: 'Dm'}],
});

const User = mongoose.model('User', userSchema);

module.exports = User;