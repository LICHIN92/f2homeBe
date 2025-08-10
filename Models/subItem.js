import mongoose from "mongoose";

const schema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    Item: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true
    },
    Pic: {
        type: String,
        required: true
    },
    Availability: {
        type: Boolean,
        default: false
    },
    Stock:{
        type:Number,
        required:true
    }
},
    {
        timestamps: true
    }
)
const SUBITEM=mongoose.model("subitem",schema)

export default SUBITEM