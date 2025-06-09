const express = require('express');
const router = express.Router();
const commentController = require('../controllers/Comment');

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComments);

module.exports = router;
