import Mongoose from 'mongoose';
import { databaseUri } from './environment';

// We use a in-memory database for testing
const nodeEnv = process.env.NODE_ENV?.trim();

export const initializeDatabaseConnection = async () => {
    if (nodeEnv === 'test') return;

    try {
        if (!databaseUri)
            throw Mongoose.MongooseError;

        Mongoose.set('strictQuery', true);
        await Mongoose.connect(databaseUri);
        console.log("🍃 Database successfully connected\n");
    } catch (error) {
        console.log("Database connection Error : " + error);
    }
}