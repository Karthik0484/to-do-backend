const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// Import and use the To-Do routes (Step 6)
const todoRoutes = require('./routes/todoRoutes');
app.use('/api', todoRoutes);  

// Start the server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
