import UserModel from "../models/user.model.js";
import axiosInstance from "../configs/axiosInstance.js";
export const dashboard = (req, res) => {
    return res.render('index.ejs');
}

export const addManagerPage = (req, res) => {
    return res.render('./pages/addManager.ejs');
}

export const addManager = async (req, res) => {
    try {
        // await fetch('http://localhost:8081/api/user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(req.body)
        // });
        await axiosInstance.post('/user',req.body);
        console.log("User created.");
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

export const deleteManager = async (req, res) => {
    try {
        const { id } = req.params;
        // await fetch(`http://localhost:8081/api/user/${id}`, {
        //     method: 'DELETE',
        // });
        await axiosInstance.delete(`/user/${id}`);
        console.log("User Delete.");
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}


export const updateManager = async (req, res) => {
    try {
        const { id } = req.params;
        // await fetch(`http://localhost:8081/api/user/${id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(req.body)
        // });

        await axiosInstance.patch(`user/${id}`,req.body);
        console.log("User Updated.");
        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error.message);
        return res.redirect(req.get('Referrer') || '/');
    }
}

export const viewManagers = async (req, res) => {
    try {
        // let response = await fetch('http://localhost:8081/api/user', {
        //     method: 'GET'
        // });
        // let data = await response.json();
        let response = await axiosInstance.get('/user');
        return res.render('./pages/viewManagers.ejs',{
            data:response.data
        });
    } catch (error) {
        console.log(error.message);        
        return res.render('./pages/viewManagers.ejs',{
            data:[]
        });
    }
}

export const loginPage = (req,res)=>{
    return res.render('./pages/login.ejs');
}

export const login= async(req,res)=>{
    try {
        let response = await axiosInstance.post('/user/login',req.body);
        res.cookie('token',response.data.token);
        console.log("Login success.");
        return res.redirect('/');        
    } catch (error) {
        console.log(error.message);        
        return res.redirect('/login');        
    }
}