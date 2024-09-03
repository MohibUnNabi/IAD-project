import mongoose from "mongoose";

const ExhibitorSchema = new mongoose.Schema({
    Exhibitor_Name:{type:String , required:true},
    Company_Name:{type:String , required:true},
    Company_Email:{type:String , required:true},
    Official_Document: [{ type: String, required: true }],
    User_id_Fk: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const ExhibitorModel = mongoose.model("Exhibitor",ExhibitorSchema)

export default ExhibitorModel