import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import detailsSchema from "./details";
import {nanoid} from 'nanoid'
const userSchema = new Schema({
    _id:{
        type:String,
        default: ()=>nanoid()
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    delete: {
        type: Boolean,
        default: false
    },
    address:detailsSchema
},
    { timestamps: true }
)
userSchema.pre('save', async function (next) {
    try {
        const savedPassword = await bcrypt.hash(this.password, 5)
        this.password = savedPassword
        next()
    }
    catch {
        next(error)
    }
})
userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
});
var User = mongoose.model("User", userSchema);
export default User
