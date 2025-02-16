const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullName, phoneNumber, password } = req.body;
  const name = fullName;
  const phone = phoneNumber;
  console.log(req.body);
  console.log("above name");
  console.log(req.body.fullName);
  console.log("below name");
  if (!name || !phone || !password) {
    console.log("in sanitize");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ phone });
    console.log("is user exist: ");
    console.log(userExists);
    if (userExists) {
      console.log("Error: User already exists with phone:", phone);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("creating user");
    const newUser = new User({
      name,
      phone,
      password,
    });
    await newUser.save();

    console.log("created");

    console.log("User registration successful ");
    res.status(201).json({ message: "User registered successfully." });
  } catch (e) {
    console.error("Error during user registration:", e.message);
    res.status(500).json({ error: e.message });
  }
};

const loginUser = async (req, res) => {
  console.log("in login user backend");
  const { phoneNumber, password } = req.body;
  const phone = phoneNumber;
  console.log(req.body);
  const user = await User.findOne({ phone });
  console.log(`user: ${user}`);
  if (!user) return res.status(500).json({ message: "User not found" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log(`ispassword ${isPasswordCorrect}`);
  if (!isPasswordCorrect) return res.status(500).json({ message: "incorrect password" });
  console.log(`ispassword after`);

  const token = jwt.sign({ id: phoneNumber }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.status(200).json({ message: "Login successful", token });
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}).select("-password"); // Exclude passwords from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

module.exports = { registerUser, loginUser, getAllUsers };