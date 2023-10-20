import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { notFound, gotOne } = messages.equipment;

export const getById = Controller.route<EquipmentModel>(async (request, response) => {
    const { id } = request.params;
    if (!id) return response.send(404, notFound);

    const equipment = await Equipment.findById(id);
    if (!equipment) return response.send(404, notFound);

    return response.send(200, gotOne, equipment);
});