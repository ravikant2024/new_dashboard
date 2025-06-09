const mongoose = require("mongoose");
const { Schema } = mongoose;

const wachatSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    orderDetails: {
        type: Object, // Or a more specific structure if known
        required: true
    },
    customerData: {
        type: Object,
        default: {} // Default empty object if no data is provided
    },
    activeFlag: {
        type: Boolean,
        default: true
    }
},{timestamps:true});

module.exports = mongoose.model("Wachat", wachatSchema);
