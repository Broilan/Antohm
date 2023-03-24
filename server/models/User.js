const mongoose = require('mongoose');
const { Schema } = mongoose;

//date schema 
const dateSchema = new Schema({
    date: String,
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
});

const userSchema = new Schema({
    email: {type: String, required: true},
    displayName: {type: String, required: true},
    name: {type: String, reqired: true},
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    posts: Array,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    resources: [{type: mongoose.Schema.Types.ObjectId, ref: 'Resource'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark'}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}],
    notifications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}],
    savedDates: [dateSchema],
    external_links: [{
        title: {type: String},
        url: {type: String}
    }],
    header: String,
    pfp: String,
    applications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
    responses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
    interviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
    offers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    Dms: [{type: Schema.Types.ObjectId, ref: 'Dm'}],
});



const User = mongoose.model('User', userSchema);

module.exports = User;