import { Router } from "express";
import { dashboard,addManagerPage,addManager, viewManagers, deleteManager,loginPage,login } from "../controllers/client.controller.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import checkUserRole from "../middlewares/userRole.middleware.js";

const router = Router();

router.get('/login',loginPage);
router.post('/login',login)

router.use(userAuth);

router.get('/',dashboard);

router.get('/addManager',checkUserRole,addManagerPage);
router.post('/addManager',checkUserRole,addManager);

router.get('/viewManager',checkUserRole,viewManagers);

router.get('/delete/:id',checkUserRole,deleteManager);



export default router;