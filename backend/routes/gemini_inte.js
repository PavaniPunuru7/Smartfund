const express=require("express");
const router=express.Router();

const {gemini_response} = require("../controllers/gemini_inte")

router.post("/gemini",gemini_response);

module.exports = router