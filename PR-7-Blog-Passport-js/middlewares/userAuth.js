import User from "../models/user.model.js";

const userAuth = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    res.locals.user = req.user;
    return next();    
}

export default userAuth;