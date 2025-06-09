const express = require("express")
const { processMessage } = require("../controllers/Wa/Message");
const router = express.Router()

router
    .post("/processMessage", processMessage);

module.exports = router