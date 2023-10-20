import supertest, { SuperTest } from 'supertest';
import { Express } from 'express';
import MemoryDatabase from './database.helper';

export default class Test {

    private _request: SuperTest<supertest.Test>;
    private _database: MemoryDatabase;

    public findById: typeof this._database.findById;
    public findOne: typeof this._database.findOne;
    private _insertOne: (() => Promise<void>) | null = null;

    constructor(private _app: Express) {
        this._request = supertest(this._app);
        this._database = new MemoryDatabase();
        this.findById = this._database.findById;
        this.findOne = this._database.findOne;
    }

    async route(method: Method, routePath: string, testFunction: (request: () => supertest.Test) => void) {
        describe(`${method.toUpperCase()} '${routePath}'`, () => {
            beforeAll(async () => {
                await this._database.connect();
                if (this._insertOne)
                    await this._insertOne();
            });

            // TODO: This means inserted data will only work for one test.
            // Should this be after all ?
            afterEach(this._database.clear);
            
            afterAll(this._database.close);

            testFunction(
                () => this._request[method](routePath)
            );
        });
    }
    
    insertOne(collection: string, document: {}) {
        this._insertOne = () => this._database.insertOne(collection, document);
    }
    
}

type Method = 'get' | 'post' | 'put' | 'delete';