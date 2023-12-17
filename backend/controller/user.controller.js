import { User } from "../model/user.model.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      email,
      password,
      profilePic: `https://api.multiavatar.com/${uuidv4().slice(0, 6)}.png`,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res
      .status(200)
      .json({ message: "user created successfully", token, newUser });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User doesn't exist" });

    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(401).json({ message: "Password doesn't match" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({ message: "login successfully", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

// ^
export const logoutUser = (req, res) => {
  try {
    delete req.headers.authorization;
    res.status(200).json({ message: "logout successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
