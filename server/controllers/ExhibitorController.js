
import ExhibitorModel from '../models/ExhibitorModel.js'
import UserModel from '../models/UserModel.js'
import mongoose from 'mongoose';
class ExhibitorController {

  static getData = async (req, res) => {
    try {

      const result = await ExhibitorModel.find().populate('User_id_Fk', 'User_Name');



      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }


  static addData = async (req, res) => {
    try {
      console.log(req.body)
      const { Exhibitor_Name, Company_Name, Company_Email, User_id_Fk } = req.body;
      
      // Ensure files are uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
  
      const imageUrls = req.files.map(file => file.filename);
      
      const Exhibitor = new ExhibitorModel({
        Exhibitor_Name,
        Company_Name,
        Company_Email,
        User_id_Fk,
        Official_Document: imageUrls
      });
      await Exhibitor.save();
      res.status(201).json({ message: "Official Docs added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  

static deleteData = async (req, res) => {
  try {

    const ExhibitorId = req.params.id;


    await ExhibitorModel.findByIdAndDelete(ExhibitorId);

    // Send a success response
    res.status(200).json({ message: "Official Docs deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
static updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { Exhibitor_Name, Company_Name, Company_Email ,User_id_Fk} = req.body;

    let imageUrl = null;

 
    if (req.file) {
      imageUrl = req.file.filename;
    }

    const exhibitor = await ExhibitorModel.findOne({ User_id_Fk: id })


    exhibitor.Exhibitor_Name = Exhibitor_Name;
    exhibitor.Company_Name = Company_Name;
    exhibitor.Company_Email = Company_Email;
    exhibitor.User_id_Fk = User_id_Fk;
  
    if (imageUrl) {
      exhibitor.Official_Document = imageUrl;
    }

    await exhibitor.save();

    res.status(200).json({ message: "Exhibitor updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

static viewSingleData = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    

    const exhibitor = await ExhibitorModel.findOne({ User_id_Fk: new mongoose.Types.ObjectId(userId) })

  
    console.log('Exhibitor fetched:', exhibitor);
    if (!exhibitor) {
      return res.status(404).json({ error: "Exhibitor not found" });
    }

    res.status(200).json({ user, exhibitor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
static viewSingleData2 = async (req, res) => {
  try {
    const userId = req.params.id;
    const exhibitor = await ExhibitorModel.findOne({ User_id_Fk: new mongoose.Types.ObjectId(userId) })
    if (!exhibitor) {
      return res.status(404).json({ error: "Exhibitor not found" });
    }
    res.status(200).json(exhibitor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

}


export default ExhibitorController