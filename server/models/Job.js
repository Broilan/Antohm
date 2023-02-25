const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    UserID: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    jobType: String, //Applied, In review, interviews, rejected, accepted, misc  
    CompanyName: String, 
    CompanyLogo: String,
    Position: String,
    PositionType: String, //Full-time, part-time, internship, etc
    PositionLevel: String, //Entry level, mid-level, senior
    PositionLocation: String, //remote, at office
    PriorityLevel: String, //Low, medium, high, extreme
    Notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;