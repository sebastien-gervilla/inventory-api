import { Equipment } from '../../../models/equipment.model';
import { Controller } from "../../../helpers";

import messages from '../../../docs/res.messages.json';
import { studentsApi } from '@/services/students-api';
const { gotAll, notFound } = messages.equipment;

export const get = Controller.route(async (_, response) => {
    const students = await studentsApi.get();
    if (!students) return response.send(404, notFound)
    return response.send(200, gotAll, students);
});