const express=require("express");
const router=express.Router();
const borrowMoney=require("../controllers/borrowMoneyController");

router.post("/borrowmoney",borrowMoney);

module.exports=router;