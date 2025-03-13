const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');
const multer = require('multer');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsImage/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add a New Course (with Instructor ID)
router.post('/addcourselms', upload.single('image'), async (req, res) => {
  try {
    const { title, description, categories, tags, userId, instructorName } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!userId) {
      return res.status(400).json({ message: 'Instructor ID is required' });
    }

    const newCourse = new Course({
      title,
      description,
      categories: categories ? JSON.parse(categories) : [],
      tags: tags ? JSON.parse(tags) : [],
      image,
      userId,
      instructorName, // Associate with instructor
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add course' });
  }
});

// Get Courses by Instructor
router.get('/getcourses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const courses = await Course.find({ userId });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

// Update Course by _id
router.put('/updatecourse/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, categories, tags } = req.body;
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(categories && { categories: JSON.parse(categories) }),
      ...(tags && { tags: JSON.parse(tags) }),
      ...(req.file && { image: req.file.filename }),
    };

    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course' });
  }
});


// Delete Course by _id
router.delete('/deletecourse/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete associated image file
    if (course.image) {
      const imagePath = path.join(__dirname, '..', 'uploadsImage', course.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
});



module.exports = router;

// Configure file storage
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsModule/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Fix here: use `storage: storage1` instead of `{ storage1 }`
const upload1 = multer({ storage: storage1 });

// Create curriculum (POST request)
router.post('/createCurriculum', upload1.array('fileDocs', 50), async (req, res) => {
  const { id, units } = req.body; // Use id instead of courseId

  try {
    let course = await Course.findById(id); // Find course by ID

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let parsedUnits = JSON.parse(units);
    const fileDocs = req.files || [];
    let fileIndex = 0;

    parsedUnits.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        lesson.videoUrl = lesson.videoUrl || ''; // Keep video URL if provided

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





router.get('/getcourse/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course' });
  }
});
