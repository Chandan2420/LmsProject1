const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  instituteName: String,
  instituteCode: String,
  instituteType: String,
  phone: String,
  website: String,
  streetAddress: String,
  city: String,
  postalCode: String,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  logo: {
    type: String, // The path to the uploaded logo image
    required: true
  },
  role: { type: String, default: "instituteadmin" },
  resetToken: { type: String },
    resetTokenExpiry: { type: Date },
});

module.exports = mongoose.model("Institute", InstituteSchema);