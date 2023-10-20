import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { updated, notFound } = messages.equipment;

export const update = Controller.route<EquipmentModel>(async (request, response) => {
    const { id } = request.params;
    if (!id) return response.send(404, notFound);

    await Equipment.updateOne(request.body);
    return response.send(201, updated);
});