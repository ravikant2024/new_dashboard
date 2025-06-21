const express = require('express');
const router = express.Router();
const shippingChargeController = require('../controllers/ShippingCharge');

router.post('/create', shippingChargeController.create);
router.get('/', shippingChargeController.listShippingCharge);
router.post('/getchargebyaddres', shippingChargeController.fetchShippingCharge);

module.exports = router;
