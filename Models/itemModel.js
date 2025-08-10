import mongoose from "mongoose";

const schema = new mongoose.Schema({
    Item: {
        type: String,
        required: true,
        unique: true
    },
    pic: {
        type: String,
        required: true
    }
});

const ITEM = mongoose.model('item', schema);

export default ITEM;
