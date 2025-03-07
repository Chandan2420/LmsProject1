const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = 5001;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/uploadsModule', express.static('uploadsModule'));
app.use('/uploadsImage', express.static('uploadsImage'));


app.use('/api', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});