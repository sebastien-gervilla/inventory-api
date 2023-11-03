import mongoose, { Types, mongo } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export default class MemoryDatabase {

    private _server: Promise<MongoMemoryServer>;

    constructor() {
        this._server = MongoMemoryServer.create();
    }

    // Database handling

    connect = async () => {
        const uri = (await this._server).getUri();
        await mongoose.connect(uri);
    }

    clear = async () => {
        const { collections } = mongoose.connection;
        for (const key in collections)
           await collections[key].deleteMany();
    }

    close = async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await (await this._server).stop();
    }

    // Useful queries

    findById = async <T>(collectionName: string, id: Types.ObjectId) => {
        const { collections } = mongoose.connection;
        return await collections[collectionName].findOne<T>({ _id: id });
    }

    findOne = async (collectionName: string, filters: Filters) => {
        const { collections } = mongoose.connection;
        return await collections[collectionName].findOne(filters);
    }

    insertOne = async (collectionName: string, document: {}) => {
        const { collections } = mongoose.connection;
        await collections[collectionName].insertOne(document);
    }
}

type Filters = mongo.Filter<mongo.BSON.Document>;