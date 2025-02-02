const express=require("express");
const borrow=require("../models/borrowMoneyModel");
const jwt=require("jsonwebtoken");

const borrowMoney=async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
    if(!token)return res.status(400).json({message:"missing token"});

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded)return res.status(400).json({message:"invalid token"});

    const borrower=decoded.id;

    const {amount,business,period}=req.body;

    if(!amount||!business||!period){
        return res.status(400).json({message:"all fields are required"});
    }

    const newborrow=new borrow({
        amount,
        business,
        period,
        borrower
    });

    await newborrow.save();

    res.status(200).json({message:"borrow request created successfully"});
        
    } catch (error) {
        res.status(500).json({message:"error in borrowmoney creation",error:error.message});
    }



}

module.exports=borrowMoney;