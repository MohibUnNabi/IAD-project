
import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ContactModel from '../models/ContactModel.js';
class ContactController {

    static getData = async (req, res) => {
        try {

            const result = await ContactModel.find()
            res.send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static addData = async (req, res) => {
        try {
            const { Name, Email, Subject, Msg } = req.body;

            const Contact = new ContactModel({
                Name,
                Email,
                Subject,
                Msg,


            })
            await Contact.save();
            res.status(201).json({ message: "User added successfully", id: Contact._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Errror" });
        }
    }






}


export default ContactController