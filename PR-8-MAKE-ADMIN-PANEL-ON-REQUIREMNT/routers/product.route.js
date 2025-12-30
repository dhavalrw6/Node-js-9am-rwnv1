import { Router } from "express";
import productController from "../controllers/product.controller.js"
import upload from "../middlewares/imageUpload.js";

const router = Router();

router.get('/add-product',productController.addProductPage);
router.post('/add-product',upload, productController.addProduct);

router.get('/view-product',productController.viewProduct);

export default router;