import { Equipment, EquipmentModel } from '@/models/equipment.model';
import { Controller } from '@/helpers';

import messages from '@/docs/res.messages.json';
const { created } = messages.equipment;

export const create = Controller.route<EquipmentModel>(async (request, response) => {
    const equipment = await Equipment.create(request.body);
    return response.send(201, created, equipment);
});