const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import CORS
require('dotenv').config();

const app = express();

// ✅ Enable CORS Middleware
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ['https://to-kbm12i45r-karthik-ks-projects-4c2799af.vercel.app'];
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin;

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            console.log('Origin:', origin);
            callback(null, true); // ✅ Allow request
        } else {
            callback(new Error("Not allowed by CORS")); // ✅ Correct error message
        }
    },
    credentials: true, // ✅ Allows cookies if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // ✅ Allowed methods
}));

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

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
