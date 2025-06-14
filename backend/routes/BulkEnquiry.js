const express = require('express');
const router = express.Router();
const buklEnquiryController = require('../controllers/BulkEnquiry');

router.post('/', buklEnquiryController.create);
router.get('/', buklEnquiryController.getAll);

module.exports = router;
