import { Router } from "express";
import subcategoryController from "../controllers/subcategory.controller.js";
import upload from "../middlewares/imageUpload.js";

const router = Router();

// add subcategory
router.get('/add-subcategory',subcategoryController.addsubCategoryPage);
router.post('/add-subcategory',upload, subcategoryController.addsubCategory);

// view subcategory
router.get('/view-subcategory',subcategoryController.viewsubCategoryPage);

// delete 
router.get('/subcategory/delete/:id',subcategoryController.deletesubCategory);

// edit
router.get('/subcategory/edit/:id',subcategoryController.editsubCategoryPage);
router.post('/subcategory/edit/:id',upload, subcategoryController.editsubCategory);

export default router;