const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const fileRoutes = require('./routes/fileRoutes'); // Import fileRoutes

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

connectDB();

// Use the routes
app.use('/api', authRoutes);
app.use('/api', instructorRoutes);
app.use('/api', fileRoutes); // Add fileRoutes

app.listen(5000, () => console.log('Server running on port 5000'));
