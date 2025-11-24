import LocalStrategy from "passport-local";
import passport from "passport";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

LocalStrategy.Strategy;

passport.use('local',new LocalStrategy(async(username,password,done)=>{
    try {
        
        let user = await User.findOne({name : username});

        if(!user) return done(null,false);

        let isValid = await bcrypt.compare(password,user.password);
        if(!isValid) return done(null,false);

        return done(null,user);

    } catch (error) {
        done(error,false);
    }
}))


passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try {
        let user = await User.findById(id);
        return done(null,user);
    } catch (error) {
        return done(error,false);
    }
});

export default passport;