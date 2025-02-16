const express = require("express");
const User = require("../models/userModel");
const lend = require("../models/lendMoneyModel");
const jwt = require("jsonwebtoken");

const lendMoney = async (req, res) => {
  console.log("in the lendmoney");
  console.log(req.body);
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) return res.status(400).json({ message: "missing token" });
    console.log(process.env.JWT_SECRET);

    let decoded;
    try {
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      if (!decoded) return res.status(500).json({ message: "invalid token" });
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    console.log("before decoded phonenumber");
    const phoneNumber = decoded.id; // Assuming the token contains the phoneNumber as 'id'
    console.log(phoneNumber);

    // Fetch the user by phoneNumber
    const user = await User.findOne({ phone: phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lender = user._id; // Use the user's ObjectId
    console.log("after lender");
    const { amount, interest, period, emi } = req.body;
    console.log("req body");
    console.log(req.body);

    if (!amount || !interest || !period || !emi) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const newlend = new lend({
      amount,
      interest,
      period,
      emi,
      lender, // This is now the ObjectId of the user
    });
    await newlend.save();

    res.status(200).json({ message: "lend request successful" });
  } catch (error) {
    res.status(500).json({ message: "error in lend request", error });
  }
};

module.exports = lendMoney;