import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";

const adminRouter = Router();

// register user.
adminRouter.get('/register',adminController.registerUserPage);
adminRouter.post('/register',adminController.registerUser);

adminRouter.get('/login',adminController.loginUserPage);
adminRouter.post('/login',adminController.loginUser);

// forget Password
adminRouter.post('/forget-password',adminController.forgetPassword);

// OTP verify
adminRouter.get('/otp-verify',adminController.otpVerifyPage);
adminRouter.post('/otp-verify',adminController.otpVerify);

// new password
adminRouter.get('/new-password',adminController.newPassPage);
adminRouter.post('/new-password',adminController.newPass);

adminRouter.use(userAuth);
adminRouter.get('/',adminController.indexPage);
adminRouter.get('/profile',adminController.profilePage);
adminRouter.get('/logout',adminController.logout);

// change Password
adminRouter.get('/account-setting',adminController.accountSettingPage);
adminRouter.post('/account-setting',adminController.accountSetting);





export default adminRouter;