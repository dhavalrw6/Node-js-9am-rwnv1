import User from "../models/user.model.js";
import bcrypt from "bcrypt";


const adminController = {
  dashboard(req, res) { 
    return res.render("./index.ejs");
  },
  signupPage(req,res){
    return res.render('./pages/signup.ejs');
  },
  async signup(req,res){
    try {
        const {password,confirmPassword} = req.body;
        if(password != confirmPassword){
          console.log("Password and Confirm Password Not Match.");          
          return res.redirect(req.get('Referrer') || '/');
        }

        let data = await User.create(req.body);
        console.log(`${data.name} account Created.`);
        // redirect to login page.
        return res.redirect('/login');        
    } catch (error) {
        console.log(error.message);        
        return res.redirect(req.get('Referrer') || '/');
    }
  },
  loginPage(req,res){
    return res.render('./pages/login.ejs');
  },
  async login(req,res){
    try {
      const {email,password} = req.body;

      let user = await User.findOne({email,isActive:true});
      
      if(user){

        let isValid = await bcrypt.compare(password,user.password);

        if(isValid){
          console.log("Login Success.");
          res.cookie('id',user.id);
          return res.redirect('/');
        }else{
          console.log("Password Not Match.");        
          return res.redirect(req.get('Referrer') || '/');
        }
      }else{
        console.log("User Not Found.");        
        return res.redirect(req.get('Referrer') || '/');
      }

    } catch (error) {
      console.log(error.message);      
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  logout(req,res){
    res.clearCookie('id');
    return res.redirect('/login');
  },
  async getAllUsersPage(req,res){
      const users = await User.find({});
      return res.render('./pages/get-all-users.ejs',{
        users
      });
  }
};

export default adminController;
