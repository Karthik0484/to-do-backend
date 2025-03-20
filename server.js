const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS
require('dotenv').config();

const app = express();

// ✅ Enable CORS (Add This)
app.use(cors({
    origin: "https://to-d25k1oevt-karthik-ks-projects-4c2799af.vercel.app",  // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed request types
    credentials: true  // Allows cookies and credentials if needed
}));

app.use(express.json());

// Connect to MongoDB
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
