import Category from "../models/category.model.js";
import fs from "fs";
const categoryController = {
  addCategoryPage(req, res) {
    return res.render("./pages/add-category.ejs");
  },
  async addCategory(req, res) {
    try {
      req.body.image = req.file.path;
      let data = await Category.create(req.body);
      console.log(data);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async viewCategoryPage(req, res) {
    try {

        let categorys = await Category.find({});
      return res.render("./pages/view-category.ejs",{
        categorys
      });
    } catch (error) {
      return res.render("./pages/view-category.ejs",{
        categorys : []
      });
    }
  },
  async deleteCategory(req,res){
    try {
      const {id} = req.params;
      let data = await Category.findByIdAndDelete(id);
      fs.unlinkSync(data.image);
      console.log("category delete success.");      
      return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  async editCategoryPage(req,res){
    try {
      let data = await Category.findById(req.params.id);
      return res.render('./pages/edit-category.ejs',{data});
    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  async editCategory(req,res){
    try {
      if(req.file) req.body.image = req.file.path;

      let data = await Category.findByIdAndUpdate(req.params.id,req.body);
      if(req.file) fs.unlinkSync(data.image);
      console.log("Category Updated.");
      return res.redirect('/view-category');
    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  }

};

export default categoryController;
