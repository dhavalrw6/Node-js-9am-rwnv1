import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";

const adminRouter = Router();

// register user.
adminRouter.get('/register',adminController.registerUserPage);
adminRouter.post('/register',adminController.registerUser);

adminRouter.get('/login',adminController.loginUserPage);
adminRouter.post('/login',adminController.loginUser);

adminRouter.use(userAuth);
adminRouter.get('/',adminController.indexPage);
adminRouter.get('/profile',adminController.profilePage);
adminRouter.get('/logout',adminController.logout);

// change Password
adminRouter.get('/account-setting',adminController.accountSettingPage);
adminRouter.post('/account-setting',adminController.accountSetting);



export default adminRouter;