const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
