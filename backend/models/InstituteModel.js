const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  instituteName: { type: String, required: true },
  instituteCode: { type: String, required: true, unique: true },
  instituteType: { type: String },
  affiliation: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  website: { type: String },

  address: {
    streetAddress: { type: String },
    city: { type: String },
    postalCode: { type: String }
  },

  contactPerson: {
    name: { type: String, required: true },
    role: { type: String },
    email: { type: String, required: true },
    phone: { type: String }
  },

  account: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },

  additionalInfo: {
    numberOfStudents: { type: Number },
    numberOfInstructors: { type: Number },
    logo: { type: String }
  },

  termsAccepted: { type: Boolean, required: true }
});

module.exports = mongoose.model('Institute', instituteSchema);
