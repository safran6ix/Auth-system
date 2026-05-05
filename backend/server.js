const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Explicitly specify the .env file path
dotenv.config({ path: path.join(__dirname, '.env') });

// Load env vars
dotenv.config();

// Debug: Check if JWT_SECRET is loaded
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'Yes' : 'No');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

if (!process.env.JWT_SECRET) {
    console.error('WARNING: JWT_SECRET not found in .env file!');
    console.error('Using temporary secret for testing. NEVER use this in production!');
    process.env.JWT_SECRET = 'temporary_secret_key_for_development_only_12345';
}


// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// Mount routers
app.use('/api/auth', auth);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});