const express = require("express");
const { gemini_response } = require("../controllers/gemini_inte");
const router = express.Router();

router.post("/", gemini_response);

module.exports = router;
