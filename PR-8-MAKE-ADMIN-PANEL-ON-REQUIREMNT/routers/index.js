import { Router } from "express";
import adminRouter from "./admin.route.js";
import flashMsg from "../middlewares/flashMsg.js";
import categoryRouter from "./category.route.js" 
import userAuth from "../middlewares/userAuth.js";

const router = Router();

router.use('/',flashMsg, adminRouter);
router.use('/',userAuth, categoryRouter);

export default router;