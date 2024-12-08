import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: {
      type: Date,
      expires: 120, // Expire after 120 seconds (2 minutes)
      default: Date.now,
    },
  },
  { timestamps: true }
);
const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
