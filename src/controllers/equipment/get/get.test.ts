import Test from '../../../../testing/helpers/test.helper';
import { app } from '../../../server';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';

const test = new Test(app)

test.route('get', '/equipment', (request) => {
    it('Should get equipments properly.', async () => {
        const response: Response<EquipmentModel[]> = await request();
        const { data } = response.body;
        
        expect(Array.isArray(data)).toBe(true);
    });
});