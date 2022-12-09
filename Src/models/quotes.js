import mongoose from "mongoose";
import { Schema } from "mongoose";
import {nanoid} from 'nanoid'

const quoteSchema = new Schema({
    _id:{
        type:String,
        default: ()=>nanoid()
    },
    tittle:{
        type: String,
        required:false
    },
    by: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required:true
    }
},
    { timestamps: true }
)
const Quote=mongoose.model("quotes",quoteSchema)
export default  Quote

