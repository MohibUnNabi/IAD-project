 import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    User_Name:{type:String , required:true},
    User_Email:{type:String , required:true},
    User_Password:{type:String , required:true},

    User_Status:{type:String , required:true},
    User_Role:{type:String , required:true},
    
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel