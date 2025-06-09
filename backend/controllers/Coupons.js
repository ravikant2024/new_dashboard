const Coupon = require('../models/Coupons');

/**
 * Coupon Controller
 * @description Controller for handling coupon operations
 */
const couponController = {
   
    createCoupon: async (req, res) => {
        try {
            const {
                couponId,
                name,
                description,
                maxIssuance,
                maxMoneyDiscount,
                discountPercentage,
                isPercentage,
                startDate,
                endDate
            } = req.body;

            // Validate required fields
            if (!couponId || !name || !maxMoneyDiscount) {
                return res.status(400).json({
                    success: false,
                    message: 'Coupon ID, name and max money discount are required'
                });
            }

            // Check if coupon with the same ID already exists
            const existingCoupon = await Coupon.findOne({ couponId });
            if (existingCoupon) {
                return res.status(400).json({
                    success: false,
                    message: 'Coupon with this ID already exists'
                });
            }

            // Create new coupon
            const coupon = new Coupon({
                couponId,
                name,
                description,
                maxIssuance,
                maxMoneyDiscount,
                discountPercentage,
                isPercentage,
                startDate: startDate || Date.now(),
                endDate: endDate || null
            });

            await coupon.save();

            return res.status(201).json({
                success: true,
                data: coupon,
                message: 'Coupon created successfully'
            });
        } catch (error) {
            console.error('Error creating coupon:', error);
            return res.status(500).json({
                success: false,
                message: 'Error creating coupon',
                error: error.message
            });
        }
    },

    /**
     * Get all coupons
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getAllCoupons: async (req, res) => {
        try {
            const coupons = await Coupon.find();
            return res.status(200).json({
                success: true,
                count: coupons.length,
                data: coupons
            });
        } catch (error) {
            console.error('Error fetching coupons:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching coupons',
                error: error.message
            });
        }
    },

    /**
     * Get a coupon by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getCouponById: async (req, res) => {
        try {
            const { id } = req.params;
            const coupon = await Coupon.findById(id);

            if (!coupon) {
                return res.status(404).json({
                    success: false,
                    message: 'Coupon not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: coupon
            });
        } catch (error) {
            console.error('Error fetching coupon:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching coupon',
                error: error.message
            });
        }
    },

    /**
     * Get a coupon by couponId
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getCouponByCouponId: async (req, res) => {
        try {
            const { couponId } = req.params;
            const coupon = await Coupon.findOne({ couponId });

            if (!coupon) {
                return res.status(404).json({
                    success: false,
                    message: 'Coupon not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: coupon
            });
        } catch (error) {
            console.error('Error fetching coupon:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching coupon',
                error: error.message
            });
        }
    },

    /**
     * Update a coupon
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    updateCoupon: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const coupon = await Coupon.findById(id);
            if (!coupon) {
                return res.status(404).json({
                    success: false,
                    message: 'Coupon not found'
                });
            }

            // If couponId is being updated, check for duplicates
            if (updateData.couponId && updateData.couponId !== coupon.couponId) {
                const existingCoupon = await Coupon.findOne({ couponId: updateData.couponId });
                if (existingCoupon) {
                    return res.status(400).json({
                        success: false,
                        message: 'Coupon with this ID already exists'
                    });
                }
            }

            const updatedCoupon = await Coupon.findByIdAndUpdate(
                id,
                { ...updateData, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                success: true,
                data: updatedCoupon,
                message: 'Coupon updated successfully'
            });
        } catch (error) {
            console.error('Error updating coupon:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating coupon',
                error: error.message
            });
        }
    },

    /**
     * Delete a coupon
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    deleteCoupon: async (req, res) => {
        try {
            const { id } = req.params;
            const coupon = await Coupon.findById(id);

            if (!coupon) {
                return res.status(404).json({
                    success: false,
                    message: 'Coupon not found'
                });
            }

            await Coupon.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: 'Coupon deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting coupon:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting coupon',
                error: error.message
            });
        }
    },

    /**
     * Issue a coupon (increment issuedCount)
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
issueCoupon: async (req, res) => {
    try {
        const { id } = req.params; // coupon id
        const userId = req.body.userId; // pass userId in request body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required to issue coupon',
            });
        }

        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found',
            });
        }

        // Check if coupon is active
        if (!coupon.isActive) {
            return res.status(400).json({
                success: false,
                message: 'Coupon is inactive',
            });
        }

        // Check if coupon is expired
        if (coupon.endDate && new Date(coupon.endDate) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Coupon has expired',
            });
        }

        // Check if user has already used the coupon
        if (coupon.usedBy.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: 'You have already used this coupon',
            });
        }

        // Check if maximum issuance limit is reached
        if (coupon.maxIssuance !== null && coupon.issuedCount >= coupon.maxIssuance) {
            return res.status(400).json({
                success: false,
                message: 'Maximum issuance limit has been reached',
            });
        }

        // Increment issuedCount
        coupon.issuedCount += 1;
        // Add user to usedBy array
        coupon.usedBy.push(userId);

        await coupon.save();

        return res.status(200).json({
            success: true,
            data: coupon,
            message: 'Coupon issued successfully',
        });
    } catch (error) {
        console.error('Error issuing coupon:', error);
        return res.status(500).json({
            success: false,
            message: 'Error issuing coupon',
            error: error.message,
        });
    }
},
    /**
     * Decrement coupon issued count
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    decrementCouponIssuedCount: async (req, res) => {
        try {
            const { id } = req.params;
            const coupon = await Coupon.findById(id);

            if (!coupon) {
                return res.status(404).json({
                    success: false,
                    message: 'Coupon not found'
                });
            }

            // Check if issuedCount is already at 0
            if (coupon.issuedCount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Coupon issued count is already 0'
                });
            }

            // Decrement issuedCount
            coupon.issuedCount -= 1;
            await coupon.save();

            return res.status(200).json({
                success: true,
                data: coupon,
                message: 'Coupon issued count decremented successfully'
            });
        } catch (error) {
            console.error('Error decrementing coupon issued count:', error);
            return res.status(500).json({
                success: false,
                message: 'Error decrementing coupon issued count',
                error: error.message
            });
        }
    }
};

module.exports = couponController; 