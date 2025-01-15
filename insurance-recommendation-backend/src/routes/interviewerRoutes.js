const express = require("express");
const router = express.Router();
const {
  startInterview,
  generateNextQuestion,
  endInterview,
} = require("../controllers/interviewerController");

router.post("/start-interview", startInterview);
router.post("/next-question", generateNextQuestion);
router.post("/end-interview", endInterview);

module.exports = router;
