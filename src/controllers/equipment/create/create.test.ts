import Test from '../../../../testing/helpers/test.helper';
import { app } from '../../../server';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';

const test = new Test(app);

test.route('post', '/equipment', (request) => {
    it('Should successfully insert equipment.', async () => {
        const response: Response<EquipmentModel> = await request().send({name: 'Cable'});
        expect(response.statusCode === 201).toBe(true);
    });

    it('Should reject missing name.', async () => {
        const response: Response<EquipmentModel> = await request().send({
            usedBy: [],
            max: 21
        });
        expect(response.statusCode === 400).toBe(true);
    });

    it('Should accept missing usedBy (default value).', async () => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            max: 21
        });
        expect(response.statusCode === 201).toBe(true);
    });

    it('Should accept missing max (default value).', async () => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            usedBy: []
        });
        expect(response.statusCode === 201).toBe(true);
    });

    it('Should reject "max" below mininum.', async () => {
        const response: Response<EquipmentModel> = await request().send({
            name: 'name',
            max: 0
        });
        expect(response.statusCode === 400).toBe(true);
    });
});