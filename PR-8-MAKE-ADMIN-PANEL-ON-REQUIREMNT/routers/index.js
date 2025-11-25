import { Router } from "express";
import adminRouter from "./admin.route.js";
import flashMsg from "../middlewares/flashMsg.js";

const router = Router();

router.use('/',flashMsg, adminRouter);

export default router;