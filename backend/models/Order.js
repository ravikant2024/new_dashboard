const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    item: {
        type: [Schema.Types.Mixed],
        required: true
    },
    email: {
        type: String,
    default:"181fa04376@gmail.com",
        required: true
    },
    guestFlag: {
        type: Boolean,
        default:false,
        required: true
    },
    address: {
        type: [Schema.Types.Mixed],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Dispatched', 'Out for delivery', 'Cancelled', 'Delivered'],
        default: 'Pending'
    },
    paymentMode: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    paymentDetails:{

    },
    query: [messageSchema],
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
