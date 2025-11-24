import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    image:{
        required : true,
        type : String
    },
    title : {
        required : true,
        type : String,
    },
    date : {
        required : true,
        type : Date
    },
    description : {
        required : true,
        type : String
    }
},{
    timestamps:true
})

const Movie = mongoose.model('movieTbl',movieSchema);

export default Movie;