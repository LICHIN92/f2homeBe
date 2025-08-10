import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    isAddress: {
        type: Boolean,
        default: false
    },
    HouseName: {
        type: String,
    },
    User: {
        type: Boolean,
        default: false
    },
    Place: {
        type: String
    },
    Post: {
        type: String
    },
    PIN: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const USER = mongoose.model("user", userSchema)

export default USER