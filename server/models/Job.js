const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    SavedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    company: String, 
    companyLogo: String,
    position: String,
    aboutCompany: String,
    jobType: String,
    location: String,
    linkedInLinks: String, 
    datePosted: String
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;