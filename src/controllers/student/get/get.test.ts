import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';

const apiTest = new ApiTest('get', '/student');

apiTest.create(() => {

    apiTest.route('/', 'Should return an array of students.', async (request) => {
        const response: Response<any[]> = await request();
        const { data } = response.body;
        
        expect(Array.isArray(data)).toBe(true);
    });

    apiTest.route('faketest/', 'Should throw not found if API is down.', async (request) => {
        const response: Response<any[]> = await request();
        expect(response.status).toBe(404);
    });

});