// services/coupon.js
const Coupon = require('../models/Coupons');

// Function to create a new coupon
const postCoupon = async (name, code, discount, discountType, expiredAt) => {
  const newCoupon = new Coupon({ name, code, discount, discountType, expiredAt });
  await newCoupon.save();
  return newCoupon;
};

// Function to fetch all coupons
const fetchCoupon = async () => {
  return await Coupon.find();
};

// Update coupon
const updateCoupon = async (couponId, updateData) => {
  const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateData, { new: true });
  return updatedCoupon;
};

module.exports = { postCoupon, fetchCoupon,updateCoupon };
