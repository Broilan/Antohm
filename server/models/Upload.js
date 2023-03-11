const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    photo: { type: String, required: true },
    postType: { type: String, required: true },
    user: {type: Schema.Types.ObjectId, ref: "User", required: false},
    post: {type: Schema.Types.ObjectId, ref: "Post", required: false}
  });

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;