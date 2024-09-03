import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    
    Name:{type:String , required:true},
    Email:{type:String , required:true},
    Subject:{type:String , required:true},
    Msg:{type:String , required:true},

 
    
})

const ContactModel = mongoose.model("Contact",ContactSchema)

export default ContactModel