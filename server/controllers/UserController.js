
import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class UserController {

  static getData = async (req, res) => {
    try {
      
      const result = await UserModel.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static addData = async (req, res) => {
    try {
      const { User_Name, User_Email, User_Password, User_Status, User_Role } = req.body;
      const existingUser = await UserModel.findOne({
        $or: [{ User_Name }, { User_Email }]
      });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }
      const hash = await bcrypt.hash(User_Password, 10);
      const user = new UserModel({
        User_Name,
        User_Email,
        User_Password: hash,
        User_Role,
        User_Status,

      })
      await user.save();
      res.status(201).json({ message: "User added successfully", id: user._id }); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Errror" });
    }
  }



  static updateData = async (req, res) => {
    try {
      const userId = req.params.id;
      const { User_Name, User_Email, User_Password, User_Status, User_Role } = req.body;
      const updateduser = await UserModel.findByIdAndUpdate(
        userId,
        {
          User_Name,
          User_Email,
          User_Password,
          User_Role,
          User_Status,
        },
        { new: true }
      );
      if (!updateduser) {
        return res.status(404).json({ error: "user not found" });
      }
      res.status(200).json({ message: "user updated successfully", user: updateduser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static viewSingleData = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.user_status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  static updateStatus = async (req, res) => {
    try {
      const userId = req.params.id;
      const { User_Status } = req.body;
  
      // Only update the User_Status field
      const updateduser = await UserModel.findByIdAndUpdate(
        userId,
        { User_Status },
        { new: true }
      );
  
      if (!updateduser) {
        return res.status(404).json({ error: "user not found" });
      }
  
      res.status(200).json({ message: "user updated successfully", user: updateduser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  static deleteData = async (req, res) => {
    try {

      const userId = req.params.id;


      await UserModel.findByIdAndDelete(userId);

      // Send a success response
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  static changePassword = async (req, res) => {
    try {
      const { id, previousPassword, newPassword } = req.body;
      const dbUser = await UserModel.findById(id);
      if (!dbUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(previousPassword, dbUser.User_Password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect previous password" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash new password
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { User_Password: hashedPassword },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  static login = async (req, res) => {
    try {
      const { User_Email, User_Password } = req.body;
      const db_user = await UserModel.findOne({ User_Email });
      if (db_user) {
        const passwordMatch = await bcrypt.compare(User_Password, db_user.User_Password);
        if (passwordMatch) {

          const token = jwt.sign(
            {
              user: db_user._id,

            },
            process.env.JWT_SECRET
          );
          res.status(200).json({
            token,
            role: db_user.User_Role,
            id: db_user._id, // Ensure the id is included here
            username: db_user.User_Name,
            status: db_user.User_Status,
          });
        } else {
          return res.status(401).json({ error: "Wrong password" });
        }
      }
      else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }




}


export default UserController