const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor','admin',], required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    avatar: { type: String },
});

module.exports = mongoose.model('User', userSchema);
