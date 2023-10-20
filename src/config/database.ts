import Mongoose from 'mongoose';

// We use a in-memory database for testing
const nodeEnv = process.env.NODE_ENV?.trim();

export const initializeDatabaseConnection = async () => {
    if (nodeEnv === 'test') return;

    try {
        if (!process.env.DB_URI)
            throw Mongoose.MongooseError;

        Mongoose.set('strictQuery', true);
        await Mongoose.connect(process.env.DB_URI);
        console.log("🍃 Database successfully connected\n");
    } catch (error) {
        console.log("Database connection Error : " + error);
    }
}