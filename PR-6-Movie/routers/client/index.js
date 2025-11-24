import { Router } from "express";
import { homePage } from "../../controllers/client/index.js";

const router = Router();

router.get('/',homePage);

export default router;