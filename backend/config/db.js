import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // We added { family: 4 } to force IPv4 resolution
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log(`SUCCESS: MongoDB Connected to ${conn.connection.host}`);
    } catch (error) {
        console.error(`ERROR connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;