const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    profilePicture: { type: String },
    institution: { type: String },
    specialization: { type: String },
    experience: { type: Number },
    biography: { type: String },
    linkedin: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Instructor', instructorSchema);
