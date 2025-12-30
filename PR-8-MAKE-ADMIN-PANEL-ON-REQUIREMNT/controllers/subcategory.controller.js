import Category from "../models/category.model.js";
import subCategory from "../models/subcategory.model.js";
import fs from "fs";
const subcategoryController = {
  async addsubCategoryPage(req, res) {
    let categorys = await Category.find({}); 
    return res.render("./pages/add-subcategory.ejs",{categorys});
  },
  async addsubCategory(req, res) {
    try {
      req.body.image = req.file.path;
      let data = await subCategory.create(req.body);
      console.log(data);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async viewsubCategoryPage(req, res) {
    try {
        let subcategorys = await subCategory.find({}).populate('category');
        // return res.json(subcategorys)
      return res.render("./pages/view-subcategory.ejs",{
        subcategorys
      });
    } catch (error) {
      return res.render("./pages/view-subcategory.ejs",{
        subcategorys : []
      });
    }
  },
  async deletesubCategory(req,res){
    try {
      const {id} = req.params;
      let data = await subCategory.findByIdAndDelete(id);
      fs.unlinkSync(data.image);
      console.log("subcategory delete success.");      
      return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  async editsubCategoryPage(req,res){
    try {
      let data = await subCategory.findById(req.params.id);
      return res.render('./pages/edit-subcategory.ejs',{data});
    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  async editsubCategory(req,res){
    try {
      if(req.file) req.body.image = req.file.path;

      let data = await subCategory.findByIdAndUpdate(req.params.id,req.body);
      if(req.file) fs.unlinkSync(data.image);
      console.log("subCategory Updated.");
      return res.redirect('/view-subcategory');
    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  }

};

export default subcategoryController;
