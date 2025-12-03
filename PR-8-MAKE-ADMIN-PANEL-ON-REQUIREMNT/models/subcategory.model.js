import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true
    }
}) 

const subCategory = mongoose.model('subcategory',subcategorySchema);


export default subCategory;