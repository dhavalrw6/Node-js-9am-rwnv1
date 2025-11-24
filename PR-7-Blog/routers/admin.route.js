import { Router } from "express";
import adminCtl from "../controllers/admin.controller.js"
import userAuth from "../middlewares/userAuth.js";

const adminRouter = Router();

adminRouter.get('/signup',adminCtl.signupPage);
adminRouter.post('/signup',adminCtl.signup);

adminRouter.get('/login',adminCtl.loginPage);
adminRouter.post('/login',adminCtl.login);


adminRouter.use(userAuth);
adminRouter.get('/', adminCtl.dashboard);
adminRouter.get('/logout', adminCtl.logout);
adminRouter.get('/get-all-users', adminCtl.getAllUsersPage);




export default adminRouter;