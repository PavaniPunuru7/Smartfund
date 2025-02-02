const express=require("express");
const router=express.Router();
const lendMoney=require("../controllers/lendMoneyController");

router.post("/lendmoney",lendMoney);

module.exports=router;