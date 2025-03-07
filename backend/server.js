const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes'); // Import fileRoutes
const profileRoutes = require('./routes/profileRoutes');
const cookieParser = require("cookie-parser");
const AddInstitutes = require('./routes/AddInstitutes');
const adminRoutes = require('./routes/adminRoutes');
const InstituteRoutes = require('./routes/InstituteRoutes');
const InstituteProfile = require('./routes/InstituteProfile');
const InstructorProfile = require('./routes/InstructorProfile');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

connectDB();


// Use the routes
app.use('/api', authRoutes);
app.use('/api', fileRoutes); // Add fileRoutes
app.use('/api', profileRoutes); // Add profileRoutes
app.use('/api', AddInstitutes);
app.use('/api', adminRoutes);
app.use('/api', InstituteRoutes);
app.use("/api", InstituteProfile);
app.use("/api", InstructorProfile);


app.listen(5000, () => console.log('Server running on port 5000'));
