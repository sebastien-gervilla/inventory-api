import Test from '../../../../testing/helpers/test.helper';
import { app } from '../../../server';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';
import { Types } from 'mongoose';

const equipment: Partial<EquipmentModel> = {
    _id: new Types.ObjectId(),
    name: 'Cable',
    usedBy: ['Sebastus 1er', 'Paysan'],
    max: 2
}

const test = new Test(app);
test.insertOne('equipments', equipment);

const equipmentId = equipment._id.toString();
test.route('get', '/equipment/' + equipmentId, (request) => {
    it('Should find the inserted equipment.', async () => {
        const response: Response<EquipmentModel> = await request();
        const { data } = response.body;
        
        expect(response.statusCode === 200).toBe(true);
        expect(data._id === equipmentId).toBe(true);
    });
});