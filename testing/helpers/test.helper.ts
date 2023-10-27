import { connection } from 'mongoose';
import supertest, { SuperTest } from 'supertest';
import MemoryDatabase from './database.helper';
import { initializeServer } from '../../src/server';
import { Server } from '../../src/types/server.types';

export default class ApiTest {

    private _request!: SuperTest<supertest.Test>;
    private _database: MemoryDatabase;

    public findById: typeof this._database.findById;
    public findOne: typeof this._database.findOne;
    private _insertOne: (() => Promise<void>) | null = null;

    constructor(private _method: Method, private _baseRoute: string) {
        this._database = new MemoryDatabase();
        this.findById = this._database.findById;
        this.findOne = this._database.findOne;
    }

    async create(testSuite: () => void) {
        describe(`${this._method.toUpperCase()} '${this._baseRoute}'`, () => {
            beforeAll(async () => {
                const { app } = await initializeServer();
                this._request = supertest(app);
                await this._database.connect();
            });

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
            if (!this._request) throw new Error(NO_REQUEST_ERROR);

            await testFunction(
                () => this._request[this._method](this._baseRoute + endpoints)
            );
        });
    }

    static async server(
        description: string, 
        testFunction: (server: Server | null) => Promise<void>, 
        envOverwrite?: Partial<NodeJS.ProcessEnv>
    ) {
        it(description, async () => {
            process.env = {
                ...process.env,
                ...envOverwrite
            }

            const { server } = await initializeServer();
        
            await testFunction(server);
        
            await connection.close();
            server?.close();
        })
    }
    
    insertOne(collection: string, document: {}) {
        this._insertOne = () => this._database.insertOne(collection, document);
    }
    
}

type Method = 'get' | 'post' | 'put' | 'delete';

const NO_REQUEST_ERROR = 'Route tests must be wrapped around "create" method.';