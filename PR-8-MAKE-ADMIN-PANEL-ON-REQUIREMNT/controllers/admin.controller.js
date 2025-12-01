import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

let otp = null;

const adminController = {
  indexPage(req, res) {
    return res.render("./index.ejs");
  },
  registerUserPage(req, res) {
    return res.render("./pages/register.ejs");
  },
  loginUserPage(req, res) {
    return res.render("./pages/login.ejs");
  },
  async registerUser(req, res) {
    try {
      const { password, confirmPassword } = req.body;
      if (password != confirmPassword) {
        req.flash("error", "Password And Confirm Password Not Match.");
        return res.redirect("/register");
      }
      let hashPassword = await bcrypt.hash(password, 10);
      req.body.password = hashPassword;
      await UserModel.create(req.body);
      req.flash("success", "User Created Successfully.");
      return res.redirect("/login");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/register");
    }
  },
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      let user = await UserModel.findOne({ username });

      if (!user) {
        req.flash("error", "User Not Found.");
        return res.redirect("/login");
      }

      let isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        req.flash("error", "Wrong Password.");
        return res.redirect("/login");
      }

      req.flash("success", "Login Success");
      return res.cookie("id", user.id).redirect("/");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/login");
    }
  },
  profilePage(req, res) {
    return res.render("./pages/profile.ejs");
  },
  logout(req, res) {
    res.clearCookie("id");
    return res.redirect("/login");
  },
  accountSettingPage(req, res) {
    return res.render("./pages/account-setting.ejs");
  },
  async accountSetting(req, res) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const { id } = req.cookies;

      let user = await UserModel.findById(id);

      let isValid = await bcrypt.compare(currentPassword, user.password);

      if (isValid) {
        if (newPassword == confirmPassword) {
          user.password = await bcrypt.hash(newPassword, 10);
          await user.save();
          req.flash("success", "Password Changed.");
          return res.redirect("/logout");
        } else {
          req.flash("error", "new password and confirm password not match.");
          return res.redirect(req.get("Referrer") || "/");
        }
      } else {
        req.flash("error", "Current Password not match.");
        return res.redirect(req.get("Referrer") || "/");
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      let user = await UserModel.findOne({ email });
      if (user) {
        otp = Math.floor(10000 + Math.random() * 999999);
        console.log(otp);
        
        const payload = {
          id: user.id,
        };
        const token = jwt.sign(payload, "key");
        res.cookie("token", token);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "rw6.dhaval.pl@gmail.com",
            pass: "echwsfphtyprsvmb",
          },
        });

        const info = await transporter.sendMail({
          from: '<rw6.dhaval.pl@gmail.com>',
          to: user.email,
          subject: "OTP verify For Change Password",
          html: `<b>OTP: ${otp}</b>`, // HTML body
        });

        console.log("Message sent:", info.messageId);

        return res.redirect('/otp-verify');
      } else {
        req.flash("error", "Email Not Found");
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error.message);
      req.flash("error", "504 Internal Server Error.");
      return res.redirect("/login");
    }
  },
  otpVerifyPage(req,res){
    return res.render('./pages/otp-verify.ejs');
  },
  otpVerify(req,res){
      if(req.body.otp == otp) return res.redirect('/new-password');
      return res.redirect(req.get('Referrer') || '/');
  },
  newPassPage(req,res){
    return res.render('./pages/new-pass.ejs');
  },
  async newPass(req,res){
    try {
      const {newPass,confirmPass} = req.body;
      if(newPass == confirmPass){
        const {token} = req.cookies;
        let decode = jwt.verify(token,"key");
        console.log(decode);
        let user = await UserModel.findById(decode.id);

        if(user){
          user.password = await bcrypt.hash(newPass,10);
          await user.save();
          console.log("Password Change Success.");
          return res.redirect('/login');
        }else{
          console.log("user not found");
          return res.redirect('/login'); 
        }
        
      }else{
        console.log("new password and confirm password not match.");        
        return res.redirect(req.get('Referrer') || '/');  
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get('Referrer') || '/');
    }
  }
};

export default adminController;
