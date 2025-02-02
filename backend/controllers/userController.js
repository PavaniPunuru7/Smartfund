const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { text } = require("body-parser");
const crypto=require("crypto");
const jwt=require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, phone, password } = req.body;
    
    if ( !name  || !phone || !password  ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    

    
    

    try {
        const userExists = await User.findOne({ phone });
        if (userExists) {
            console.log("Error: User already exists with phone:",phone);
            return res.status(400).json({ message: "User already exists"});
        }
            

        

        const newUser = new User({
            name,
            phone,
            password,
            
        });
        await newUser.save();


      

        console.log("User registration successful ");
        res.status(201).json({ message: "User registered successfully.",
        });

    } catch (e) {
        console.error("Error during user registration:", e.message);
        res.status(500).json({ error: e.message });
    }
};

const loginUser=async(req,res)=>{
    const {phone,password}=req.body;
    const user=await User.findOne({phone});
    if(!user)return res.status(500).json({message:"User not found"});

    const isPasswordCorrect=await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect) return res.status(500).json({message:"incorrect pasword"});

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.status(200).json({message:"Login succesful",token});

};
module.exports={ registerUser, loginUser };