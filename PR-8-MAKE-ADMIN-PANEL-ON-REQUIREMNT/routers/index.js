import { Router } from "express";
import adminRouter from "./admin.route.js";
import flashMsg from "../middlewares/flashMsg.js";
import categoryRouter from "./category.route.js" 
import subcategoryRouter from "./subcategory.route.js" 
import productRouter from "./product.route.js" 
import userAuth from "../middlewares/userAuth.js";

const router = Router();

router.use('/',flashMsg, adminRouter);
router.use('/',userAuth, categoryRouter);
router.use('/',userAuth, subcategoryRouter);
router.use('/',userAuth, productRouter);

export default router;