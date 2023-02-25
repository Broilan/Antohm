const { Schema } = require("mongoose");

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {type: String},
    description: {type: String},
    isComplete: {type: Boolean, default: false},
    importance: {type: String},
    target_date: {type: Date},
    comments: [{type:  mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    owner: {type: Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true}); //adds .createdAt and .updatedAt and sets them automatically as needed

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;