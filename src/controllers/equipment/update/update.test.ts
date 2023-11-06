import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';
import { Types } from 'mongoose';

const COLLECTION = 'equipments';
const equipment: Partial<EquipmentModel> = {
    _id: new Types.ObjectId(),
    name: 'Cable',
    borrowedBy: ['Sebastus 1er', 'Paysan'],
    amount: 2
}

const apiTest = new ApiTest('put', '/equipment');
apiTest.insertOne(COLLECTION, equipment);

const equipmentId = equipment._id.toString();
apiTest.create(() => {

    apiTest.route(`/${equipmentId}`, "Should successfully update equipment.", async (request) => {
        const newEquipment = {
            ...equipment,
            name: 'Key'
        };

        const response: Response<EquipmentModel> = await request().send(newEquipment);
        
        const updatedEquipment = await apiTest.findById<EquipmentModel>(COLLECTION, equipment._id);

        expect(response.statusCode).toBe(204);
        expect(updatedEquipment?.name).toBe(newEquipment.name);
    });

    apiTest.route(`/invalid`, "Should throw an error for invalid id.", async (request) => {
        const newEquipment = {
            ...equipment,
            name: 'newKey'
        };

        const response: Response<EquipmentModel> = await request().send(newEquipment);

        expect(response.statusCode).toBe(404);
    });

    const randomId = new Types.ObjectId().toString();
    apiTest.route(`/${randomId}`, "Should throw an error when equipment not found.", async (request) => {
        const newEquipment = {
            ...equipment,
            name: 'newKey'
        };

        const response: Response<EquipmentModel> = await request().send(newEquipment);

        expect(response.statusCode).toBe(404);
    });

    apiTest.route(`/${equipmentId}`, "Should throw an error for incorrect values.", async (request) => {
        const newEquipment = {
            ...equipment,
            amount: -1
        };

        const response: Response<EquipmentModel> = await request().send(newEquipment);

        expect(response.statusCode).toBe(400);
    });
});