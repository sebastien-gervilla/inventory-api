import { isValidObjectId } from 'mongoose';
import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { notFound, deleted } = messages.equipment;

export const _delete = Controller.route<EquipmentModel>(async (request, response) => {
    const { id } = request.params;
    if (!isValidObjectId(id)) 
        return response.send(404, notFound);

    const equipment = await Equipment.findById(id);
    if (!equipment) return response.send(404, notFound);

    await equipment.deleteOne();
    return response.send(204, deleted);
});