const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS
require('dotenv').config();

const app = express();

// ✅ Enable CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://to-kbm12i45r-karthik-ks-projects-4c2799af.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// Import and use the To-Do routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api', todoRoutes);

// Start the server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
