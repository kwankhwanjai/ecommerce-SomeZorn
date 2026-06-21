import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ==========================
// TOKEN GENERATOR (USER)
// ==========================
const createToken = (id) => {
  return jwt.sign({ id, role: "user" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ==========================
// USER LOGIN
// ==========================
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// USER REGISTER
// ==========================
const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email?.trim().toLowerCase();

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (min 8 chars)",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// ADMIN LOGIN
// ==========================
const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }, // ✅ FIX สำคัญ
      );

      return res.json({
        success: true,
        token,
      });
    }

    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser, adminlogin };
