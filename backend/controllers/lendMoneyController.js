const express=require("express");
const User=require("../models/userModel");
const lend=require("../models/lendMoneyModel");
const jwt=require("jsonwebtoken");

const lendMoney=async(req,res)=>{

try {
    const token=req.headers.authorization?.split(" ")[1];

    if(!token)return res.status(400).json({message:"missing token"});

    const decoded=await jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded) return res.status(500).json({message:"invalid token"});

    const lender=decoded.id;

    const {amount,interest,period,emi}=req.body;

    if(!amount||!interest||!period||!emi){
        res.status(500).json({message:"all fields are required"});
    }

    const newlend=new lend({
        
        amount,
        interest,
        period,
        emi,
        lender

    });
    await newlend.save();

    res.status(200).json({message:"lend request succesful"});
    
} catch (error) {
    res.status(500).json({message:"error in lend request",error});
    
}
};

module.exports=lendMoney;
