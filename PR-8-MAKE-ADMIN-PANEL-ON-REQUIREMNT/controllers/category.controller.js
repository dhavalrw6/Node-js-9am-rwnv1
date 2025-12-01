import Category from "../models/category.model.js";

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
};

export default categoryController;
