import express from "express";
import dotenv from "./configs/dotenv.js";
import router from "./routers/index.js";
import db from "./configs/db.js";
import path from "path";
import cookieParser from "cookie-parser";
import LocalStrategy from "./middlewares/passport.js";
import session from "express-session";
import passport from "passport";

const app = express();
const port = dotenv.PORT || 3000;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:'user',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',router);

app.listen(port,(err)=>{
    if(!err){
        console.log("Server started.");        
        console.log("http://localhost:"+port);        
    }
})