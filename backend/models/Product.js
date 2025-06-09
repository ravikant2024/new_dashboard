const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    sku: { type: String, required: true },
    thumbnail: { type: String , required: true }, 
    images: [{ type: String, required: true  }],
    technicalSpecification: { type: String ,required: true},  
    warranty: { type: String , required: true },
    videoLink: { type: String },
},
{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
