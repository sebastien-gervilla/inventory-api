import Mongoose from 'mongoose';

export interface EquipmentModel extends Mongoose.Document {
    name: string,
    usedBy: string[],
    max: number
}

const EquipmentSchema = new Mongoose.Schema<EquipmentModel>({
    name: {
        type: String,
        maxlength: 64,
        required: true,
        unique: true,
        trim: true
    },
    usedBy: {
        type: [String],
        required: true,
        default: []
    },
    max: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
}, {
    timestamps: true
});

const Equipment = Mongoose.model<EquipmentModel>("Equipment", EquipmentSchema, "equipments");
export { Equipment };