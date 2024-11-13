import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlength:[50,"Your name cannot exceed 50 characters"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Your password must have atleast 6 characters"],
        select:false
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    }
})

const User=mongoose.model("User",userSchema)

export default User