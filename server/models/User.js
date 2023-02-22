const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, reqired: true},
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    tasks: [{type: String}],
    external_links: [{
        title: {type: String},
        url: {type: String}
    }],
    jobs: [{type: String}],
    job_materials: [{type: Schema.Types.ObjectId, ref: 'Material'}],
    connections: [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages_sent: [{type: Schema.Types.ObjectId, ref: 'DM_Sent'}],
    messages_received: [{type: Schema.Types.ObjectId, ref: 'DM_Received'}],
});

const User = mongoose.model('User', userSchema);

module.exports = User;