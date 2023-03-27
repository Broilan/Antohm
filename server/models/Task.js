const { Schema } = require("mongoose");

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {type: String},
    task: {type: String},
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    status: {type: String},
    importance: {type: String},
    owner: {type: Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true}); //adds .createdAt and .updatedAt and sets them automatically as needed

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;