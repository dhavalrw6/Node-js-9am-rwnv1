import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin","manager","employee"],
        default : 'employee'
    }
})

const UserMondel = mongoose.model('userModel',userSchema);

export default UserMondel;