const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceSchema = new Schema({
    macId: {
        type: String,
        required: true,
        unique: true, // Represents the primary key constraint
    },
    deviceModelno: {
        type: String,
    },
    subAdminId: {
        type: String,
        required: true,
    },
    availableCapabilities: {
        type: Object,
    },
    selectedCapabilities: [
        {
            update: {
                type: Object, // Store the updated capabilities object
                required: true,
            },
            updatedAt: {
                type: Date,
                default: Date.now, // Automatically stores the update timestamp
            },
        },
    ],
    version: {
        type: String,
    },
    limits: {
        type: Object,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Middleware to limit the array size to 50
deviceSchema.pre("save", function (next) {
    // Safeguard for undefined or non-array `selectedCapabilities`
    if (!Array.isArray(this.selectedCapabilities)) {
        this.selectedCapabilities = [];
    }

    if (this.selectedCapabilities.length > 50) {
        this.selectedCapabilities = this.selectedCapabilities.slice(-50); // Keep only the last 50 updates
    }
    next();
});

module.exports = mongoose.model("Device", deviceSchema);
