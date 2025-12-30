import express from "express";
import dotenv from "./config/dotenv.js";
import db from './config/database.js'
import router from "./routers/index.js";
import bodyParser from "body-parser"
const app = express();

const port = dotenv.PORT || 3001;
app.use(express.urlencoded({extended:true}));

app.use('/api',router);

app.listen(port,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("Server started");
        console.log("http://localhost:"+port);
    }
})