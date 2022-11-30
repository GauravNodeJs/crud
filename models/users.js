import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import mongooseSoftDelete from 'mongoose-soft-delete'

const userSchema = new Schema({
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
        unique: true
    }
},
    { timestamps: true }
)
userSchema.plugin(mongooseSoftDelete, {
    paranoid: true,
  });
userSchema.pre('save', async function (next) {
    try {
        // const salt = await bcrypt.genSalt(5)
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
