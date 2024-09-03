


import TicketModel from '../models/TicketModel.js';

import UserModel from '../models/UserModel.js'
import nodemailer from 'nodemailer';

class TicketController {

  static getData = async (req, res) => {
    try {
      const result = await TicketModel.find()
        .populate('Event_id_Fk', 'Event_Name')
        .populate('User_id_Fk', 'User_Name');
      
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error fetching data");
    }
  }
  static addData = async (req, res) => {
    try {
      const { Event_id_Fk, User_id_Fk, Ticket_Price,Ticket_Quantity } = req.body;
      const pdfPath = req.file.path;
      const ticket = new TicketModel({
        Event_id_Fk,
        User_id_Fk,
        Ticket_Quantity,
        Ticket_Price,
      });
      await ticket.save();

    
      const user = await UserModel.findById(User_id_Fk);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mhuzaifa05302@gmail.com',
          pass: 'alpu ngqj ouox zesk' 
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.User_Email, 
        subject: 'Your Ticket',
        text: 'Please find your ticket attached.',
        attachments: [
          {
            filename: 'ticket.pdf',
            path: pdfPath,
          },
        ],
      };


      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
 
      res.status(201).json({ message: 'Ticket added successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}


export default TicketController;
