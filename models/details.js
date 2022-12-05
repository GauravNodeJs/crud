import mongoose from "mongoose";
import { Schema } from "mongoose";


const detailsSchema = new Schema({
    houseNo: {
        type: Number,
        required: false,
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false,
    },
    pin: {
        type: Number,
        default: false
    }
},
    { timestamps: true }
)

var details = mongoose.model("detail", detailsSchema);
export default details
