const express = require('express');
const { getMessagesByOrderId,addMessage } = require("../controllers/Message");
const router = express.Router();
router.post('/getMessagesByOrderId', getMessagesByOrderId);
router.post('/addMessage',addMessage);
module.exports = router;
