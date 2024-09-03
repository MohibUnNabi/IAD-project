import { Schema, model } from "mongoose";

const BoothManagementSchema = new Schema({
    Event_id_Fk: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    Booth_Reserved: { type: String, required: true },
    UserId: { type: Schema.Types.ObjectId, ref: 'User',  required: false, default: null },

});

const BoothManagementModel = model("BoothManagement", BoothManagementSchema);

export default BoothManagementModel;
