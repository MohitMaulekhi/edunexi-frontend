const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db'); // add this line


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/student', require('./routes/student'));
app.use('/university', require('./routes/university'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

