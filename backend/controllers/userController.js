import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Creating Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Method from model
    const user = await User.signUp(email, password);
    // Create Token
    const token = createToken(user.id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Method from model
    const user = await User.login(email, password);

    // Create Token
    const token = createToken(user.id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signUpUser, loginUser };
