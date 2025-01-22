const Instructor = require('../models/instructorModel');

exports.InstructorProfile = async (req, res) => {
    try {
        const { fullName, email, phone, institution, specialization, experience, biography, linkedin } = req.body;

        const newInstructor = new Instructor({
            fullName,
            email,
            phone,
            profilePicture: req.file ? req.file.path : null,
            institution,
            specialization,
            experience,
            biography,
            linkedin,
        });

        await newInstructor.save();
        res.status(201).json({ message: 'Instructor profile created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create instructor profile.' });
    }
};
