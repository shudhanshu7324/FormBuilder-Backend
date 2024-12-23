import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if(!username || !email || !password || !confirmPassword){
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
  
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email already taken" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "48h",
      });
      return res.status(200).json({ message: "User created successfully", token, id: newUser._id });
    }
  } catch (error) {
    console.log(error);
        res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token, id: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const userName = async (req,res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({email})
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return;
  }
}