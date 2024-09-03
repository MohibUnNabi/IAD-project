
import CategoryModel from '../models/CategoryModel.js'

class CategoryController {

  static getData = async (req, res) => {
    try {
      const result = await CategoryModel.find()
      res.send(result)
    } catch (error) {
      console.log(error)
    }
  }

  static addData = async (req, res) => {
    try {
      const {  Category_Name, } = req.body;
      const category = new CategoryModel({
        Category_Name,
      

      })
      await category.save();
      res.status(201).json({ message: "Category addes succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Errror" });
    }
  }

  static updateData = async (req, res) => {
    try {
      const CategoryId = req.params.id;
      const {    Category_Name, } = req.body;
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        CategoryId,
        {
          Category_Name,
        },
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json({ message: "Category updated successfully", Category: updatedCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  static viewSingleData = async (req, res) => {
    try {
      const CategoryId = req.params.id;
      const Category = await CategoryModel.findById(CategoryId);
      if (!Category) {
        return res.Category_status(404).json({ error: "Category not found" });
      }
      res.status(200).json(Category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



  static deleteData = async (req, res) => {
    try {

      const CategoryId = req.params.id;


      await CategoryModel.findByIdAndDelete(CategoryId);

      // Send a success response
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}


export default CategoryController