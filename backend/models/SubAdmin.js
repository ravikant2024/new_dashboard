const mongoose = require("mongoose")
const { Schema } = mongoose

const subadminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobileNumber: {

    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    previousSearches: {
        type: [String],
        validate: {
            validator: function (array) {
                return array.length <= 10;
            },
            message: "A maximum of 10 previous searches are allowed."
        },
        default: []
    },
    devices: {
        type: [String],
        required: true,
        default: []
    }
})

module.exports = mongoose.model("SubAdmin", subadminSchema)
