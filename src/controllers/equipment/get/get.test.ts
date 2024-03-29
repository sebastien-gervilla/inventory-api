import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';

const apiTest = new ApiTest('get', '/equipment');

apiTest.create(() => {

    apiTest.route('/', 'Should return an array of equipments.', async (request) => {
        const response: Response<EquipmentModel[]> = await request();
        const { data } = response.body;
        
        expect(Array.isArray(data)).toBe(true);
    });

});