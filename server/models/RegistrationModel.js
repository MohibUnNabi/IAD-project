import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
    
    Event_id_Fk: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    ExhibitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exhibitor', required: true },
    Booth_Name:{type:String , required:true},
 
  
    
})

const RegistrationModel = mongoose.model("Registration",RegistrationSchema)

export default RegistrationModel