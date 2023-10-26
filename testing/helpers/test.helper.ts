import supertest, { SuperTest } from 'supertest';
import { Express } from 'express';
import MemoryDatabase from './database.helper';

export default class ApiTest {

    private _request: SuperTest<supertest.Test>;
    private _database: MemoryDatabase;

    public findById: typeof this._database.findById;
    public findOne: typeof this._database.findOne;
    private _insertOne: (() => Promise<void>) | null = null;

    constructor(private _app: Express, private _method: Method, private _baseRoute: string) {
        this._request = supertest(this._app);
        this._database = new MemoryDatabase();
        this.findById = this._database.findById;
        this.findOne = this._database.findOne;
    }

    async create(testSuite: () => void) {
        describe(`${this._method.toUpperCase()} '${this._baseRoute}'`, () => {
            beforeAll(this._database.connect);

            beforeEach(async () => {
                if (this._insertOne)
                    await this._insertOne();
            });

            afterEach(this._database.clear);

            afterAll(this._database.close);

            testSuite();
        });
    }

    async route(endpoints: string, description: string, testFunction: (request: () => supertest.Test) => Promise<void>) {
        it(description, async () => {
            await testFunction(
                () => this._request[this._method](this._baseRoute + endpoints)
            );
        });
    }
    
    insertOne(collection: string, document: {}) {
        this._insertOne = () => this._database.insertOne(collection, document);
    }
    
}

type Method = 'get' | 'post' | 'put' | 'delete';