import ApiTest from '../../../../testing/helpers/test.helper';
import { app } from '../../../server';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';

const apiTest = new ApiTest(app, 'post', '/equipment');

apiTest.create(() => {

    apiTest.route('/', 'Should successfully insert equipment.', async (request) => {
        const response: Response<EquipmentModel> = await request().send({name: 'Cable'});
        expect(response.statusCode).toBe(201);
    });

    apiTest.route('/', 'Should reject missing name.', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            usedBy: [],
            max: 21
        });
        expect(response.statusCode).toBe(400);
    });

    apiTest.route('/', 'Should accept missing usedBy (default value).', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            max: 21
        });
        expect(response.statusCode).toBe(201);
    });

    apiTest.route('/', 'Should accept missing max (default value).', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            usedBy: []
        });
        expect(response.statusCode).toBe(201);
    });

    apiTest.route('/', 'Should reject "max" below mininum.', async (request) => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            max: 0
        });
        expect(response.statusCode).toBe(400);
    });
});