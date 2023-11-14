import Mongoose from 'mongoose';

export interface EquipmentModel extends Mongoose.Document {
    name: string,
    borrowedBy: string[],
    amount: number
}

const EquipmentSchema = new Mongoose.Schema<EquipmentModel>({
    name: {
        type: String,
        maxlength: 64,
        required: true,
        unique: true,
        trim: true
    },
    borrowedBy: {
        type: [{
            type: String,
            maxlength: 320,
            trim: true,
            validate: [validateEmail, 'Invalid email.']
        }],
        required: true,
        default: []
    },
    amount: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
}, {
    timestamps: true
});

function validateEmail (email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const Equipment = Mongoose.model<EquipmentModel>("Equipment", EquipmentSchema, "equipments");
export { Equipment };