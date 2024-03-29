import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';

const apiTest = new ApiTest('post', '/equipment');

apiTest.create(() => {

    apiTest.route('/', 'Should successfully insert equipment.', async (request) => {
        const response: Response<EquipmentModel> = await request().send({name: 'Cable'});
        expect(response.statusCode).toBe(201);
    });

    apiTest.route('/', 'Should reject missing name.', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            borrowedBy: [],
            amount: 21
        });
        expect(response.statusCode).toBe(400);
    });

    apiTest.route('/', 'Should accept missing borrowedBy (default value).', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            amount: 21
        });
        expect(response.statusCode).toBe(201);
    });

    apiTest.route('/', 'Should accept missing amount (default value).', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            borrowedBy: []
        });
        expect(response.statusCode).toBe(201);
    });

    apiTest.route('/', 'Should reject "amount" below mininum.', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            amount: 0
        });
        expect(response.statusCode).toBe(400);
    });
});