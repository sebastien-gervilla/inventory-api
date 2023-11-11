import { isValidObjectId } from 'mongoose';
import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { unborrowed, notFound } = messages.equipment;

export const unborrow = Controller.route<EquipmentModel>(async (request, response) => {
    const { id } = request.params;
    if (!isValidObjectId(id)) 
        return response.send(404, notFound);

    const oldEquipment = await Equipment.findById(id);
    if (!oldEquipment) return response.send(404, notFound);

    const { borrower } = request.body;
    oldEquipment.borrowedBy = oldEquipment.borrowedBy.filter(
        user => user !== borrower
    );

    await oldEquipment.save();
    
    return response.send(204, unborrowed);
});