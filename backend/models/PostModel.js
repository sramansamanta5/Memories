import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:[200,"Your title cannot exceed 50 characters"]
    },
    body:{
        type:String,
        required:true,
    },
   
},{timestamps:true})

const Post=mongoose.model("Post",postSchema)

export default Post