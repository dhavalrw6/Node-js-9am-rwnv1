import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel"
    },
    comment :{
        type : Array
    }
})

const BlogModel = mongoose.model('blogModel',blogSchema);

export default BlogModel;

