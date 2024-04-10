import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Sign up method
userSchema.statics.signUp = async function (email, password) {
  // Check for empty fields
  if (!email || !password) {
    throw Error("Please fill all fields");
  }
  // Check for existing user
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }
  // Protect password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// Login method
userSchema.statics.login = async function (email, password) {
  // Check for empty fields
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  // Check for existing user
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Login");
  }

  // Compare hashed and entered password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Login");
  }

  return user;
};

export default mongoose.model("User", userSchema);
