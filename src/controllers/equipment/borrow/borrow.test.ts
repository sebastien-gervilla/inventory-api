import ApiTest from '../../../../testing/helpers/test.helper';
import { Response } from '../../../types/response.types';
import { EquipmentModel } from '../../../models/equipment.model';
import { Types } from 'mongoose';
import { createTransport } from 'nodemailer';

const sendMailMock = jest.fn();
jest.mock("nodemailer");

// @ts-ignore
createTransport.mockReturnValue({ 'sendMail': sendMailMock });

const COLLECTION = 'equipments';
const equipment: Partial<EquipmentModel> = {
    _id: new Types.ObjectId(),
    name: 'Cable',
    borrowedBy: ['test@gmail.com'],
    amount: 2
}

const apiTest = new ApiTest('put', '/equipment');
apiTest.beforeEach = () => apiTest.insertOne(COLLECTION, equipment);

const equipmentId = equipment._id.toString();
apiTest.create(() => {

    apiTest.route(`/${equipmentId}/borrow`, "Should successfully borrow equipment.", async (request) => {
        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });
        
        const updatedEquipment = await apiTest.findById<EquipmentModel>(COLLECTION, equipment._id);

        expect(response.statusCode).toBe(204);
        expect(updatedEquipment?.borrowedBy).toContain(borrower);
    });

    apiTest.route(`/invalid/borrow`, "Should throw an error for invalid id.", async (request) => {
        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    const randomId = new Types.ObjectId().toString();
    apiTest.route(`/${randomId}/borrow`, "Should throw an error when equipment not found.", async (request) => {
        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for incorrect values.", async (request) => {
        const borrower = {};
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for invalid email.", async (request) => {
        const borrower = 'borrower';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for duplicates.", async (request) => {
        const borrower = 'test@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should throw an error for exceeding amount.", async (request) => {
        await apiTest.updateById(COLLECTION, {
            ...equipment, 
            _id: equipment._id, 
            borrowedBy: ['borrower@gmail.com', 'borrower2@gmail.com']
        });

        const borrower = 'borrower3@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/borrow`, "Should properly send a mail.", async (request) => {
        sendMailMock.mockClear();

        // @ts-ignore
        createTransport.mockClear();

        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(204);
        expect(sendMailMock).toHaveBeenCalled();
    });
});