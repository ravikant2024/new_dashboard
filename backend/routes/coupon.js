const express = require('express');
const couponController = require('../controllers/Coupons');
const router = express.Router();


/**
 * @route   POST /api/coupons
 * @desc    Create a new coupon
 * @access  Public (in a real app, this would be protected)
 */
router.post('/', couponController.createCoupon);

/**
 * @route   GET /api/coupons
 * @desc    Get all coupons
 * @access  Public (in a real app, this would be protected)
 */
router.get('/', couponController.getAllCoupons);

/**
 * @route   GET /api/coupons/:id
 * @desc    Get a coupon by ID
 * @access  Public (in a real app, this would be protected)
 */
router.get('/:id', couponController.getCouponById);

/**
 * @route   GET /api/coupons/code/:couponId
 * @desc    Get a coupon by couponId
 * @access  Public (in a real app, this would be protected)
 */
router.get('/code/:couponId', couponController.getCouponByCouponId);

/**
 * @route   PUT /api/coupons/:id
 * @desc    Update a coupon
 * @access  Public (in a real app, this would be protected)
 */
router.put('/:id', couponController.updateCoupon);

/**
 * @route   DELETE /api/coupons/:id
 * @desc    Delete a coupon
 * @access  Public (in a real app, this would be protected)
 */
router.delete('/:id', couponController.deleteCoupon);

/**
 * @route   POST /api/coupons/:id/issue
 * @desc    Issue a coupon (increment issuedCount)
 * @access  Public (in a real app, this would be protected)
 */
router.post('/:id/issue', couponController.issueCoupon);

/**
 * @route   POST /api/coupons/:id/decrement
 * @desc    Decrement a coupon's issued count
 * @access  Public (in a real app, this would be protected)
 */
router.post('/:id/decrement', couponController.decrementCouponIssuedCount);

module.exports = router; 