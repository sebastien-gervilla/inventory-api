import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';
import { Types } from 'mongoose';

const COLLECTION = 'equipments';
const equipment: Partial<EquipmentModel> = {
    _id: new Types.ObjectId(),
    name: 'Cable',
    borrowedBy: ['borrower@gmail.com', 'borrower2@gmail.com'],
    amount: 2
}

const apiTest = new ApiTest('put', '/equipment');
apiTest.beforeEach = () => apiTest.insertOne(COLLECTION, equipment);

const equipmentId = equipment._id.toString();
apiTest.create(() => {

    apiTest.route(`/${equipmentId}/unborrow`, "Should successfully unborrow equipment.", async (request) => {
        const borrower = 'borrower2@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });
        
        const updatedEquipment = await apiTest.findById<EquipmentModel>(COLLECTION, equipment._id);

        expect(response.statusCode).toBe(204);
        expect(updatedEquipment?.borrowedBy).not.toContain(borrower);
    });

    apiTest.route(`/invalid/unborrow`, "Should throw an error for invalid id.", async (request) => {
        const borrower = 'borrower2@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    const randomId = new Types.ObjectId().toString();
    apiTest.route(`/${randomId}/unborrow`, "Should throw an error when equipment not found.", async (request) => {
        const borrower = 'borrower2@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });
});