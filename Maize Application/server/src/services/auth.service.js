import Jwt from 'jsonwebtoken';
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { ErrorWithStatus } from "../exceptions/error-with-status.js";

 export const Register = async (userData) => {
  const { fullName, phone, email, password, homeAddress, investmentType , role} = userData;

  // Validate required fields
  if (!fullName || !phone || !email || !password || !homeAddress || !investmentType) {
    throw new ErrorWithStatus("All fields are required",404);
  }

  // Password validation
  if (password.length < 8) {
    throw new ErrorWithStatus("Password must be at least 8 characters long",404);
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase();

  // Check if user already exists
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new ErrorWithStatus("User with this email already exists", 404);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)

  // Create a new user instant
  const user = new User({
    fullName,
    phone,
    email: normalizedEmail,
    password: hashedPassword,
    homeAddress,
    investmentType,
    role
  });

  // Save user to the database
  await user.save();

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    homeAddress: user.homeAddress,
    investmentType: user.investmentType,
  };
};

 export const Login = async (email, password) => {
  // Validate input
  if (!email || !password) {
    throw new ErrorWithStatus("Email and password are required",404);
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase();

  // Find user by email
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new ErrorWithStatus("User not found",404);
  }

  // Compare passwords
  const validPassword =  bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }
  const JWT_SECRET = process.env.JWT_SECRET || "secret";
  const token = Jwt.sign(
    {
      role: user.role || "USER",
      email: user.email,
      _id: user._id,
      sub: user._id,
    },
    JWT_SECRET,
    { expiresIn: "10m" }
  );
  // Successful login
  return {
    message: "Welcome",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      homeAddress: user.homeAddress,
      investmentType: user.investmentType,
      accessToken: token
    },
  };
};

