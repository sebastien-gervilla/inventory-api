import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';
import mongoose, { Types } from 'mongoose';

const COLLECTION = 'equipments';
const equipment: Partial<EquipmentModel> = {
    _id: new Types.ObjectId(),
    name: 'Cable',
    borrowedBy: ['Seb'],
    amount: 2
}

const apiTest = new ApiTest('put', '/equipment');
apiTest.beforeEach = () => apiTest.insertOne(COLLECTION, equipment);

const equipmentId = equipment._id.toString();
apiTest.create(() => {

    apiTest.route(`/${equipmentId}/borrow`, "Should successfully borrow equipment.", async (request) => {
        const borrower = 'Fred';
        const response: Response<EquipmentModel> = await request().send({ borrower });
        
        const updatedEquipment = await apiTest.findById<EquipmentModel>(COLLECTION, equipment._id);

        expect(response.statusCode).toBe(204);
        expect(updatedEquipment?.borrowedBy).toContain(borrower);
    });

    apiTest.route(`/invalid/borrow`, "Should throw an error for invalid id.", async (request) => {
        const borrower = 'Fred';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    const randomId = new Types.ObjectId().toString();
    apiTest.route(`/${randomId}/borrow`, "Should throw an error when equipment not found.", async (request) => {
        const borrower = 'Fred';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for incorrect values.", async (request) => {
        const borrower = {};
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for duplicates.", async (request) => {
        const borrower = 'Seb';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for exceeding amount.", async (request) => {
        await apiTest.updateById(COLLECTION, {
            ...equipment, 
            _id: equipment._id, 
            borrowedBy: ['Seb', 'Fred']
        });

        const borrower = 'Fred';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });
});