import { isValidObjectId } from 'mongoose';
import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { borrowed, amountExceeded, duplicateBorrower, notFound } = messages.equipment;

export const borrow = Controller.route<EquipmentModel>(async (request, response) => {
    const { id } = request.params;
    if (!isValidObjectId(id)) 
        return response.send(404, notFound);

    const oldEquipment = await Equipment.findById(id);
    if (!oldEquipment) return response.send(404, notFound);

    if (oldEquipment.borrowedBy.length >= oldEquipment.amount)
        return response.send(400, amountExceeded);

    const { borrower } = request.body;
    if (oldEquipment.borrowedBy.includes(borrower))
        return response.send(400, duplicateBorrower);

    oldEquipment.borrowedBy = [...oldEquipment.borrowedBy, borrower];

    await oldEquipment.save();
    
    return response.send(204, borrowed);
});