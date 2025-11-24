import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    message : {
        type : String
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel",
        required : true
    }
})

const CommentModel = mongoose.model('commentModel',commentSchema);

export default CommentModel;

