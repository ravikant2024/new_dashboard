const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema({
    macId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    expireDate: {
        type: String, 
        required: true,
    },
    mfgDate: {
        type: String,
        required: true,
    },
}, { _id: false }); 

const saleSchema = new Schema({
    subadminId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    orderDetails:{

    },
    devices: {
        type: [deviceSchema],
        required: true,
    },
}, { versionKey: false });

module.exports = mongoose.model('Sale', saleSchema);
