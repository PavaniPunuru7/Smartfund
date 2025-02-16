const express=require("express");
const router=express.Router();
const lendMoney=require("../controllers/lendMoneyController");

router.post("/lendmoney",lendMoney);

module.exports=router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5ODkxMjIwMjMiLCJpYXQiOjE3Mzg3NzkzOTcsImV4cCI6MTc0MTM3MTM5N30.LckVDlt1sAGXZovkaeJ3YPGfsG71NGk7cwMI-q--TIQ