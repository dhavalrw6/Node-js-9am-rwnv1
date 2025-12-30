import UserMondel from "../models/user.model.js"
import bcrypt from "bcrypt"
export const createUser = async (req, res) => {
    try {
        // hash password using bcrypt
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let data = await UserMondel.create(req.body);
        return res.json({message:'User Created.',data});
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        let data = await UserMondel.find({});
        return res.json(data);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const getUser = async (req,res) =>{
    try {
        const {id} = req.params;
        let data = await UserMondel.findById(id);
        return res.json(data);
    } catch (error) {
        return res.json({error:error.message});
    }
}

export const deleteUser = async (req,res)=>{
    try {
        let {id} = req.params;
        let data = await UserMondel.findByIdAndDelete(id);
        return res.json({message:"user deleted",data});
    } catch (error) {
        return res.json({error:error.message});
    }
}

export const updateUser = async (req,res)=>{
    try {
        // Don't change password using this update methord.
        let {id} = req.params;
        let data = await UserMondel.findByIdAndUpdate(id,req.body);
        return res.json({message:"user updated",data});
    } catch (error) {
        return res.json({error:error.message});
    }
}