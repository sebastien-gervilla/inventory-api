import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';
import { Types } from 'mongoose';

const COLLECTION = 'equipments';
const equipment: Partial<EquipmentModel> = {
    _id: new Types.ObjectId(),
    name: 'Cable',
    usedBy: ['Sebastus 1er', 'Paysan'],
    amount: 2
}

const apiTest = new ApiTest('delete', '/equipment');
apiTest.insertOne(COLLECTION, equipment);

const equipmentId = equipment._id.toString();
apiTest.create(() => {

    apiTest.route(`/${equipmentId}`, 'Should properly delete the equipment.', async (request) => {
        const response: Response<EquipmentModel> = await request();

        const deletedEquipment = await apiTest.findById(COLLECTION, equipment._id);
        
        expect(response.statusCode).toBe(204);
        expect(deletedEquipment).toBeNull();
    });

    apiTest.route(`/invalid`, 'Should throw an error for incorrect id.', async (request) => {
        const response: Response<EquipmentModel> = await request();
        expect(response.statusCode).toBe(404);
    });

    const randomId = new Types.ObjectId().toString();
    apiTest.route(`/${randomId}`, 'Should throw an error when equipment not found.', async (request) => {
        const response: Response<EquipmentModel> = await request();
        expect(response.statusCode).toBe(404);
    });
});