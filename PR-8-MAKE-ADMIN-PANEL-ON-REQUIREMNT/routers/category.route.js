import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import upload from "../middlewares/imageUpload.js";

const router = Router();

// add category
router.get('/add-category',categoryController.addCategoryPage);
router.post('/add-category',upload, categoryController.addCategory);

// view category
router.get('/view-category',categoryController.viewCategoryPage);

// delete 
router.get('category/delete/:id',categoryController.deleteCategory);

// edit
router.get('category/edit/:id',categoryController.editCategoryPage);
router.post('category/edit/:id',upload, categoryController.editCategory);

export default router;