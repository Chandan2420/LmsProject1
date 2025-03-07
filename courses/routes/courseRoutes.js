const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsImage/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/addcourselms', upload.single('image'), async (req, res) => {
  try {
    const { title, description, categories, tags } = req.body;
    const image = req.file ? req.file.filename : null;

    const parsedCategories = JSON.parse(categories);
    const parsedTags = JSON.parse(tags);

    const newCourse = new Course({
      title,
      description,
      categories: parsedCategories,
      tags: parsedTags,
      image,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add course' });
  }
});

module.exports = router;



router.get('/getcourses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

//Update Course
router.put('/updatecourse/:title', upload.single('image'), async (req, res) => {
  try {
    const { title, description, categories, tags } = req.body;
    const updatedCourse = {};

    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (categories) updatedCourse.categories = JSON.parse(categories);
    if (tags) updatedCourse.tags = JSON.parse(tags);
    if (req.file) updatedCourse.image = req.file.filename;

    const course = await Course.findOneAndUpdate(
      { title: req.params.title },
      updatedCourse,
      { new: true }
    );

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete Course
router.delete('/deletecourse', async (req, res) => {
  const { title } = req.body;

  try {
    const course = await Course.findOneAndDelete({ title });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
});
