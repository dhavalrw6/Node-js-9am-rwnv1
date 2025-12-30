import jwt from "jsonwebtoken";

const checkUserRole = (req,res,next)=>{
    const { token } = req.cookies;
    const decord = jwt.verify(token,'privateKey');
    console.log(req.params);
    console.log(decord);
    
    if(decord.role != 'admin'){
        if(req.params.id){
            if(decord.id != req.params.id){
                return res.json({message:"unauthorized access."});        
            }else{
                return next();
            }
        }
        return res.json({message:"unauthorized access."});
    }

    return next();
}

export default checkUserRole;