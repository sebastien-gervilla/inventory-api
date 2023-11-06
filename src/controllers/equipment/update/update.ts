import { isValidObjectId } from 'mongoose';
import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { updated, notFound } = messages.equipment;

export const update = Controller.route<EquipmentModel>(async (request, response) => {
    const { id } = request.params;
    if (!isValidObjectId(id)) 
        return response.send(404, notFound);

    const oldEquipment = await Equipment.findById(id);
    if (!oldEquipment) return response.send(404, notFound);

    const { name, borrowedBy, amount } = request.body;
    oldEquipment.name = name;
    oldEquipment.borrowedBy = borrowedBy;
    oldEquipment.amount = amount;

    await oldEquipment.save();
    
    return response.send(204, updated);
});