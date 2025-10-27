import mongoose from "mongoose";

const schema = new mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    BookedItem: {
        type: mongoose.Types.ObjectId,
        ref: "subitem",
        required: true
    },
    Item: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: 'string',
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
)
const BOOK = mongoose.model('booking', schema)

export default BOOK