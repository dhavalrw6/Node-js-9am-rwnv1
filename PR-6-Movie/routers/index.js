import { Router } from "express";
import adminPanelRouter from "./server/adminPanel.route.js";
import client from "./client/index.js"

const router = Router();

router.use('/admin',adminPanelRouter)
router.use('/',client);


export default router;