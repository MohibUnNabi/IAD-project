
import EventModel from '../models/EventModel.js';
import RegistrationModel from '../models/RegistrationModel.js'
import BoothManagementModel from '../models/BoothManagementModel.js';
import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';
class RegistrationController {

  static getData = async (req, res) => {
    try {
      const Id = req.params.id;
      const result = await RegistrationModel.find({ Event_id_Fk: Id })
      .populate('Event_id_Fk','Event_Name')
      .populate('ExhibitorId','Exhibitor_Name')
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }
static BoothCount = async (req, res) => {
    try {
      const eventid = req.params.id;
      const result = await BoothManagementModel.find({ Event_id_Fk: new mongoose.Types.ObjectId(eventid) })
        .populate('UserId', 'User_Name')
      
  
      const count_booth = result && result.length ? result.length : 0;
  
      res.send({ "booth_count": count_booth, "dataa": result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Internal server error' });
    }
    
  };
  
  
static addData = async (req, res) => {
  try {
    const {Event_id_Fk, ExhibitorId, Booth_Name,Booth_Price} = req.body;
    const Registration = new RegistrationModel({
      Event_id_Fk, 
        ExhibitorId, 
        Booth_Name,
     
        Booth_Price,
      

    })
    await Registration.save();

    res.status(201).json({message: "Booth addes succesfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Errror"});
  }
}

static deleteData = async (req, res) => {
  try {

    const RegistrationId = req.params.id;


    await RegistrationModel.findByIdAndDelete(RegistrationId);

    // Send a success response
    res.status(200).json({ message: "Booth deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
static updateData = async (req, res) => {
  try {
    const RegistrationId = req.params.id;
    const { Event_id_Fk, ExhibitorId, Booth_Name,Booth_Price} = req.body;
    const updatedRegistration = await RegistrationModel.findByIdAndUpdate(
        RegistrationId,
      { Event_id_Fk, ExhibitorId, Booth_Name,Booth_Price},
      { new: true }
    );
    if (!updatedRegistration) {
      return res.Booth_Name(404).json({ error: "Booth not found" });
    }
    res.status(200).json({ message: "Booth updated successfully", Registration: updatedRegistration });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
static viewSingleData = async (req, res) => {
  try {
    const RegistrationId = req.params.id;
    const Registration = await RegistrationModel.findById(RegistrationId);
    if (!Registration) {
      return res.status(404).json({ error: "Booth not found" });
    }
    res.status(200).json(Registration);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

static viewSingleData2 = async (req, res) => {
  try {
    const EventId = req.params.id;
    const events = await RegistrationModel.find({ Event_id_Fk: EventId }).populate('ExhibitorId', 'Exhibitor_Name');;

    if (events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const boothCount = await BoothManagementModel.aggregate([
      { $match: { Event_id_Fk: new mongoose.Types.ObjectId(EventId) } },
      { $count: "totalBooths" }
    ]);

    const totalBooths = boothCount.length > 0 ? boothCount[0].totalBooths : 0;
    res.status(200).json({ events, totalBooths });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

}


export default RegistrationController