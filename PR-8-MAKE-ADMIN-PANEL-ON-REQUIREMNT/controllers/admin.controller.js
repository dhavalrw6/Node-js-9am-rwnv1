import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const adminController = {
    indexPage(req,res){
        return res.render('./index.ejs');
    },
    registerUserPage(req,res){
        return res.render('./pages/register.ejs');
    },
    loginUserPage(req,res){
        return res.render('./pages/login.ejs');
    },
    async registerUser(req,res){
        try {
            const {password,confirmPassword} = req.body;
            if(password != confirmPassword){
                console.log("Password And Confirm Password Not Match.");                
                return res.redirect('/register');
            }
            let hashPassword = await bcrypt.hash(password,10); 
            req.body.password = hashPassword;
            await UserModel.create(req.body);
            console.log("User Created Successfully.");
            return res.redirect('/login');
        } catch (error) {
            console.log(error.message);
            return res.redirect('/register');
        }
    },
    async loginUser(req,res){
        try {
            const {username,password} = req.body;
            let user = await UserModel.findOne({username});

            if(!user) {
                console.log("User Not Found.");                
                return res.redirect('/login')
            };

            let isValid = await bcrypt.compare(password,user.password);

            if(!isValid) {
                console.log("Wrong Password.");                
                return res.redirect('/login')
            }
            
            console.log("Login Success");            
            return res.cookie('id',user.id).redirect('/');
        } catch (error) {
            console.log(error.message);
            return res.redirect('/login');
        }
    },
    profilePage(req,res){
        return res.render('./pages/profile.ejs');
    },
    logout(req,res){
        res.clearCookie('id');
        return res.redirect('/login');
    },
    accountSettingPage(req,res){
        return res.render('./pages/account-setting.ejs');    
    },
    async accountSetting(req,res){
        try {
            const {currentPassword,newPassword, confirmPassword} = req.body;
            const {id} = req.cookies;

            let user = await UserModel.findById(id);

            let isValid = await bcrypt.compare(currentPassword,user.password);

            if(isValid){
                if(newPassword == confirmPassword){
                    user.password = await bcrypt.hash(newPassword,10);
                    await user.save();
                    console.log("Password Changed.");
                    return res.redirect('/logout');
                }else{
                    console.log("new password and confirm password not match.");
                    return res.redirect(req.get('Referrer') || '/');
                }
            }else{
                console.log("Current Password not match.");                
                return res.redirect(req.get('Referrer') || '/');
            }

        } catch (error) {
            console.log(error.message);            
            return res.redirect(req.get('Referrer') || '/');
        }
    }
}

export default adminController;