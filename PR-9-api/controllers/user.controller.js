import UserModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import axiosInstance from "../configs/axiosInstance.js";

export const createUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create(req.body);
        console.log("User Created.");
        return res.json({ message: "User created.", data: user, success: true });
    } catch (error) {
        console.log(error.message);
        return res.json({ message: error.message, data: {}, success: false });
    }
}

export const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.find({});
        console.log("All User Find Success.");
        return res.json(users);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        return res.json(user);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        console.log("User delete successfully.");
        return res.json({ message: "User delete successfully." });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        await UserModel.findByIdAndUpdate(id, req.body);
        console.log("User delete successfully.");
        return res.json({ message: "User Update successfully." });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await UserModel.findOne({ email });

        if (user) {

            let isValid = await bcrypt.compare(password,user.password);
            if(isValid){
                let payload = {
                    id : user.id,
                    role : user.role
                }

            const token = jwt.sign(payload,'privateKey')            
            return res.json({message:'login success',token:token});
            }else{
                return res.json({message:"Password not match."});
            }
        } else {
            return res.json({ message: "User not found" });
        }

    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const logout = (req,res)=>{
    return res.clearCookie('token').json({message:'logout successfully.'});
}