const mongoose = require('mongoose');

const shippingChargeSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  shipping_charge: { type: Number, required: true },
});

shippingChargeSchema.index({ city: 1, state: 1, country: 1 }, { unique: true });

module.exports = mongoose.model('ShippingCharge', shippingChargeSchema);

