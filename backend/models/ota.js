const mongoose = require("mongoose");
const { Schema } = mongoose;

const otaSchema = new Schema({
    deviceModel: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    data: {
        type: String, // Allows any data type
        required: true
    },
    previousVersions: [
        {
            version: String,
            data: Schema.Types.Mixed
        }
    ]
});
otaSchema.pre("save", async function (next) {
    
    if (!this.isNew && this.isModified("version")) {
       
        this.previousVersions.unshift({
            version: this.version,
            data: this.data
        });

        if (this.previousVersions.length > 5) {
            this.previousVersions = this.previousVersions.slice(0, 5);
        }
    }
    next();
});

module.exports = mongoose.model("Ota", otaSchema);
