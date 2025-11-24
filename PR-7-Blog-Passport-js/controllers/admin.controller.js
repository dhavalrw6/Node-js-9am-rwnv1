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
  logout(req,res){
    req.logOut(()=>{
      return res.redirect('/login');
    })

  },
  async getAllUsersPage(req,res){
      const users = await User.find({});
      return res.render('./pages/get-all-users.ejs',{
        users
      });
  }
};

export default adminController;
