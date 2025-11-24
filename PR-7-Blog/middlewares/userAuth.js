import User from "../models/user.model.js";

const userAuth = async(req,res,next)=>{
    const {id} = req.cookies;

    const user = await User.findById(id);

    if(user){
        res.locals.user = user;
        next();
    }else{
        return res.redirect('/login');
    }
}

export default userAuth;