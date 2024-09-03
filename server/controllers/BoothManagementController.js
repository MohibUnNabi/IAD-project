import BoothManagementModel from '../models/BoothManagementModel.js';

class BoothManagementController {

  static getData = async (req, res) => {
    try {
    const result = await BoothManagementModel.find()
      .populate('Event_id_Fk','Event_Name')
      .populate('UserId', 'User_Name');
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

  static addData = async (req, res) => {
    try {
      const { Event_id_Fk, Booth_Reserved,UserId } = req.body;
      const BoothManagement = new BoothManagementModel({
        Event_id_Fk,
        Booth_Reserved,
        UserId
      });
      await BoothManagement.save();
      res.status(201).json({ message: "User added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static deleteData = async (req, res) => {
    try {
      const BoothManagementId = req.params.id;
      await BoothManagementModel.findByIdAndDelete(BoothManagementId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static updateData = async (req, res) => {
    try {
      const BoothManagementId = req.params.id;
      const { Event_id_Fk, Booth_Reserved,UserId } = req.body;
      const updatedBoothManagement = await BoothManagementModel.findByIdAndUpdate(
        BoothManagementId,
        { Event_id_Fk, Booth_Reserved ,UserId},
        { new: true }
      );
      if (!updatedBoothManagement) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", BoothManagement: updatedBoothManagement });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static viewSingleData = async (req, res) => {
    try {
      const BoothManagementId = req.params.id;
      const BoothManagement = await BoothManagementModel.findById(BoothManagementId);
      if (!BoothManagement) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(BoothManagement);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default BoothManagementController;
