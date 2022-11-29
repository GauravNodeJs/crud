import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema=new Schema({
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    email:{
        type:String,
        unique : true 
    }
})
userSchema.pre('save', async function(next){
    try{
    // const salt = await bcrypt.genSalt(5)
    const savedPassword =  await bcrypt.hash(this.password,5)
    this.password=savedPassword
    next()
    }
    catch{
        next(error)
    }  
})
var User = mongoose.model("User", userSchema);
export default User
