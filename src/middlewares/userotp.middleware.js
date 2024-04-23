import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { PROJECT_NAME } from "../constants.js";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import sendMail from "../utils/SendMail.js";
import {
  generateOTP,
  getEmailOTPMassage,
  getForgetPasswordmassage,
} from "../utils/generateMassage.js";

// Send Otp
const sendOTP = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(401).json({ errors: errors.array() });

    const { email, username } = request.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ message: "User already exists" });
    }
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      if (existingOTP.expirationTime > Date.now()) {
        const remainingTime = Math.ceil(
          (existingOTP.expirationTime - Date.now()) / 1000
        );
        return response.status(400).json({
          message: `${remainingTime}`,
        });
      } else {
        await OTP.deleteOne({ email });
      }
    }
    const otpNumber = generateOTP();
    let mailstatus = sendMail(
      email,
      `Subject: Your One-Time Password (OTP) for ${PROJECT_NAME}`,
      getEmailOTPMassage(username, otpNumber)
    );
    console.log(otpNumber);
    request.body.otpNumber = otpNumber;
    // Send to the next controller
    if (!mailstatus)
      return response.status(500).json({ error: "Internal server error" });
    next();
  } catch (error) {
    return response.status(500).json({ error: "Internal server error" });
  }
};

const forgetPasswordOTP = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { email } = request.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response
        .status(201)
        .json({ message: "You are not registered. Please sign up." });
    }

    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      if (existingOTP.expirationTime > Date.now()) {
        const remainingTime = Math.ceil(
          (existingOTP.expirationTime - Date.now()) / 1000
        );
        return response.status(400).json({
          message: `Please wait for ${remainingTime} seconds before requesting a new OTP`,
        });
      } else {
        await OTP.deleteOne({ email });
      }
    }
    const otpNumber = generateOTP();
    sendMail(
      email,
      `Subject: Password Reset OTP For ${PROJECT_NAME}`,
      getForgetPasswordmassage(otpNumber)
    );
    console.log(otpNumber);

    request.body.otpNumber = otpNumber;
    // Send to the next controller
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// verify Email
const verifyEmail = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(401).json({ errors: errors.array() });
    const { email, otp } = request.body;

    console.log(otp);
    // get OTP data from database
    const otpData = await OTP.findOne({ email });
    if (
      !otpData ||
      !bcrypt.compareSync(otp, otpData.otp)
    ) {
      return response.status(401).json({ error: "Invalid OTP" });
    }

    await OTP.deleteOne({ email });
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return response
        .status(200)
        .json({ message: "OTP verified successfully" });
    }
    // If user doesn't exist, proceed to next middleware
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export { forgetPasswordOTP, sendOTP, verifyEmail };

