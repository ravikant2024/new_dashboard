const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'file'], // Example: restrict message type
    },
    messageData: {
        type: String,
        required: true  // Make messageData required
    },
    isOps:{
        type:Boolean,
        required:true
    },
    iswa:{
        type:Boolean,
        required:true,
        default:false
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Message", messageSchema);
