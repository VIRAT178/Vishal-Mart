import User from "../Model/User_Model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genratetoken, genratetokenAdmin } from "../config/token.js";
import Admin from "../Model/Admin_Model.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Stong Password" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = await genratetoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: "User Created Succesfully", user });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    let isConfirm = await bcrypt.compare(password, user.password);
    if (!isConfirm) {
      return res.status(404).json({ message: "Incorrect Password" });
    }
    const token = await genratetoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ message: "Logged in Succesfully", user });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    const token = await genratetoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User Created Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const AdminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existAdmin = await Admin.findOne({ email });
    if (existAdmin) {
      return res.status(400).json({ message: "Admin already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Stong Password" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashedPassword });
    const token = await genratetoken(admin._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ message: "Admin Created Succesfully", admin });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: error.message });
  }
};
export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const isConfirm = await bcrypt.compare(password, user.password);
    if (!isConfirm) {
      return res.status(404).json({ message: "Incorrect Password" });
    }

    const token = genratetokenAdmin(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(201).json({ message: "Logged in Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
