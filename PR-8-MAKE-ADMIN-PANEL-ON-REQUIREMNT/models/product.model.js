import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "category",
        required : true
    },
    subcategory :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "subcategory",
        required : true
    }
    
})

const Product = mongoose.model('productTbl',productSchema);

export default Product;