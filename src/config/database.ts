import Mongoose from 'mongoose';
import { getEnv } from './environment';

export const initializeDatabaseConnection = async () => {
    const { nodeEnv, databaseUri } = getEnv();
    if (nodeEnv === 'test') return;

    try {
        if (!databaseUri)
            throw new Mongoose.MongooseError("Database URI not provided.");

        Mongoose.set('strictQuery', true);
        await Mongoose.connect(databaseUri);
        console.log("🍃 Database successfully connected\n");
    } catch (error) {
        console.log("Database connection error.\n" + error);
    }
}