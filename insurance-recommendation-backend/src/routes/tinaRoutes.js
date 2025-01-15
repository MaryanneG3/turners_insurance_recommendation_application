const express = require("express");
const { startChat, processResponse } = require("../controllers/tinaController");
const router = express.Router();

router.post("/start-chat", startChat);
router.post("/process-response", processResponse);

module.exports = router;
