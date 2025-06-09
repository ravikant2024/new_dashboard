const express = require('express');
const { getActiveChats,getChatById,createChat,updateActiveFlag } = require("../controllers/Chat");
const router = express.Router();
router.post('/getActiveChats', getActiveChats);
router.post('/getChatById',getChatById);
router.post('/createChat', createChat); 
router.post('/updateActiveFlag', updateActiveFlag); 
module.exports = router;
