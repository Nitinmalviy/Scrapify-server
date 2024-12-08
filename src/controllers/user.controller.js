import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import OTP from "../models/otp.model.js";

import User from "../models/user.model.js";

// User(Customer) otp send
export const saveOTP = async (request, response, next) => {
  try {
    const { email, otpNumber } = request.body;
    // OTP encryption.
    console.log(otpNumber);
    const hashedOTP = await bcrypt.hash(otpNumber, 12);
    // Save OTP in to Database
    await OTP.create({
      email,
      otp: hashedOTP,
    });
    return response.status(200).json({ message: "OTP Send successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// User(Customer) register
export const register = async (request, response, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10);
    request.body.password = hashedPassword;
    const user = await User.create(request.body);
    const token = generateToken(request.email);
    console.log(token);
    return response.status(200).json({
      message: "User Registration Successfull",
      user: { ...user.toObject(), password: undefined },
      token
    });

  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// User(Customer) LOGIN
export const signIn = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ message: "invalid email" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(email);
      return response.status(200).json({
        message: "Sign in success...",
        user: { ...user.toObject(), password: undefined },
        token,
      });
    } else {
      return response.status(400).json({
        message: "invalid password",
      });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: "Internal Server error" });
  }
};

// User(Customer) change password By email
export const changePassword = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (result.matchedCount) {
      return response
        .status(200)
        .json({ message: "Password changed successfully" });
    } else {
      return response
        .status(401)
        .json({ message: "Unauthorized user, please check your email" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
// User(Customer) change password By Id
export const changePasswordById = async (request, response, next) => {
  try {
    const { userId, password } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    if (result.matchedCount) {
      return response
        .status(200)
        .json({ message: "Password changed successfully" });
    } else {
      return response.status(401).json({ message: "Id Note Found" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

// Update  user (customer) Username By Id
export const UpdateUsername = async (request, response, next) => {
  try {
    const { username, contact, userId } = request.body;
    const result = await User.updateOne(
      { _id: userId },
      { $set: { username, contact } }
    );
    if (result.modifiedCount) {
      return response.status(200).json({ massage: "Updated successfully" });
    } else {
      return response.status(400).json({ massage: "UserId Not Found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server Error");
  }
};

export const getuserById = async (request, response, next) => {
  try {
    let userId = request.params.userId;
    const result = await User.findOne({ _id: userId });
    if (result) {
      result.password = undefined;
      return response.status(200).json({ user: result });
    } else {
      return response.status(400).json({ massage: "UserId Not Found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server Error");
  }
};

export const getuserByEmail = async (request, response, next) => {
  try {
    let email = request.params.email;
    const result = await User.findOne({ email });
    if (result) {
      result.password = undefined;
      return response.status(200).json({ user: result });
    } else {
      return response.status(400).json({ massage: "Email Not Found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server Error");
  }
};

export const getuserByContect = async (request, response, next) => {
  try {
    let contact = request.params.contact;
    const result = await User.findOne({ contact });
    if (result) {
      result.password = undefined;
      return response.status(200).json({ user: result });
    } else {
      return response.status(400).json({ massage: "Contact Number Not Found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server Error");
  }
};

export const getuserByUsername = async (request, response, next) => {
  try {
    let username = request.params.username;
    const result = await User.find({ username });
    if (result.length > 0) {
      result.forEach((user) => (user.password = undefined));
      return response.status(200).json({ users: result });
    } else {
      return response.status(400).json({ massage: "Username Not Found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server Error");
  }
};

export const getuserList = async (request, response, next) => {
  try {
    const result = await User.find();
    if (result.length > 0) {
      result.forEach((user) => (user.password = undefined));
      return response.status(200).json({ users: result });
    } else {
      return response.status(400).json({ massage: "Username Not Found" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server Error");
  }
};

// Block user by id
export const blockUserById = async (request, response, next) => {
  try {
    const userId = request.params.userId;
    const result = await User.updateOne(
      { _id: userId },
      { $set: { isBlock: true } }
    );

    if (result.modifiedCount) {
      return response
        .status(200)
        .json({ message: "User blocked successfully" });
    }
    return response.status(400).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server error");
  }
};

// Unblock user by id
export const unblockUserById = async (request, response, next) => {
  try {
    const userId = request.params.userId;
    const result = await User.updateOne(
      { _id: userId },
      { $set: { isBlock: false } }
    );
    if (result.modifiedCount) {
      return response
        .status(200)
        .json({ message: "User unblocked successfully" });
    }
    return response.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return response.status(500).json("Internal server error");
  }
};

// Token genrate
const generateToken = (email) => {
  let payload = { subject: email };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

