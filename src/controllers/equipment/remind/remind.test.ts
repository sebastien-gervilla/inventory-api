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
    borrowedBy: ['borrower@gmail.com'],
    amount: 2
}

const apiTest = new ApiTest('post', '/equipment');
apiTest.beforeEach = () => apiTest.insertOne(COLLECTION, equipment);

const equipmentId = equipment._id.toString();
apiTest.create(() => {

    apiTest.route(`/invalid/remind`, "Should throw an error for invalid id.", async (request) => {
        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    const randomId = new Types.ObjectId().toString();
    apiTest.route(`/${randomId}/remind`, "Should throw an error when equipment not found.", async (request) => {
        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(404);
    });

    apiTest.route(`/${equipmentId}/remind`, "Should throw an error if user didn't borrow.", async (request) => {
        const borrower = 'didntborrow@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(400);
    });

    apiTest.route(`/${equipmentId}/remind`, "Should properly send a reminder.", async (request) => {
        sendMailMock.mockClear();

        // @ts-ignore
        createTransport.mockClear();

        const borrower = 'borrower@gmail.com';
        const response: Response<EquipmentModel> = await request().send({ borrower });

        expect(response.statusCode).toBe(204);
        expect(sendMailMock).toHaveBeenCalled();
    });
});