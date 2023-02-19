import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// @desc Register User
// @route POST /api/users/register
// @access Public
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please Add All Fields" });
  }

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists." });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Authenticate a User
// @route POST /api/users/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get User Data
// @route GET  /api/users/me
// @access Private
export const getMe = async (req, res) => {
  const { id, username, email } = await User.findById(req.user.id);
  res.status(200).json({ id, username, email });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
