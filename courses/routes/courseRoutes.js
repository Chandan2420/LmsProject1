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




// Configure file storage
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsModule/'); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload1 = multer({ storage1 });

// Create curriculum (POST request)
router.post('/createCurriculum', upload1.array('fileDocs', 50), async (req, res) => {
  const { title, units } = req.body;

  try {
    let course = await Course.findOne({ title });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let parsedUnits = JSON.parse(units);
    const fileDocs = req.files || [];
    let fileIndex = 0;

    parsedUnits.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        // Use provided video URL
        lesson.videoUrl = lesson.videoUrl || '';

        // Store document file URL if uploaded
        if (fileIndex < fileDocs.length) {
          lesson.fileUrl = `http://localhost:5001/uploadsModule/${fileDocs[fileIndex].filename}`;
          fileIndex++;
        }
      });
    });

    course.units = parsedUnits;
    await course.save();

    res.json({ message: 'Curriculum created successfully', course });
  } catch (error) {
    console.error('Error creating curriculum:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


