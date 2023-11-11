import { connection } from 'mongoose';
import ApiTest from '../testing/helpers/test.helper';

describe("Testing server", () => {

    ApiTest.server("Should properly launch a server if not in testing environment.", async (server) => {
        expect(server).toBeTruthy();
    }, { NODE_ENV: 'production' });

    ApiTest.server("Should not launch a server if in testing environment.", async (server) => {
        expect(server).toBeNull();
    }, { NODE_ENV: 'test' });

    ApiTest.server("Should properly connect to database if not in testing environment.", async () => {
        expect(connection.readyState).toBe(1);
    }, { NODE_ENV: 'production' });

    ApiTest.server("Should not connect to database if in testing environment.", async () => {
        expect(connection.readyState).toBe(0);
    }, { NODE_ENV: 'test' });

    ApiTest.server("Should not connect to database if URI isn't found.", async () => {
        expect(connection.readyState).toBe(0);
    }, { NODE_ENV: 'production', DB_URI: undefined });

})