import { Equipment } from '../../../models/equipment.model';
import { Controller } from "../../../helpers";

import messages from '../../../docs/res.messages.json';
const { gotAll } = messages.equipment;

export const get = Controller.route(async (_, response) => {
    const equipments = await Equipment.find();
    return response.send(200, gotAll, equipments);
});