const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String }, // Optional: Video URL
  fileUrl: { type: String }, // Optional: File URL
});

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema], // Array of lessons
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: [String], required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  units: [unitSchema], // Array of units
});

module.exports = mongoose.model('Course', courseSchema);