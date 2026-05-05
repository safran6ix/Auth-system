const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');

        // Drop the users collection if it exists
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        for (let collection of collections) {
            if (collection.name === 'users') {
                await db.collection('users').drop();
                console.log('Dropped users collection');
            }
        }

        console.log('Cleanup completed');
        process.exit(0);
    } catch (error) {
        console.error('Cleanup error:', error);
        process.exit(1);
    }
};

cleanup();