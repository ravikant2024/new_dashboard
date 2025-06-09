const mongoose = require("mongoose");
const { Schema } = mongoose;

const opsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String, // Specify the type (e.g., String or Number)
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Ops", opsSchema);
