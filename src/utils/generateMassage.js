import otpGenerator from "otp-generator";
import { PROJECT_NAME } from "../constants.js";
const generateOTP = () => {
  const otp = otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    alphabets: false,
    specialChars: false,
    upperCase: false,
    unique: true,
  });
  return otp;
};

const getEmailOTPMassage = (userName, otp) => {
  return `
  Hi ${userName},
  
  We're thrilled to have you join ${PROJECT_NAME}
  
  To complete the verification process and ensure the security of your account, here's your One-Time Password (OTP):
  
  OTP: ${otp}
  
  Please use this OTP on our verification page to confirm your identity. It's valid for a single use and will expire shortly.
  
  If you encounter any issues or have questions, don't hesitate to reach out to us.
  
  Thanks for choosing ${PROJECT_NAME}!
  
  Best regards,
  ${PROJECT_NAME}`;
};

const getForgetPasswordmassage = (otp) => {
  return `Hello,

  You have requested to reset your password for your account with us.
  
  Your One-Time Password (OTP) for password reset is:   ${otp}
  
  Please use this OTP to reset your password on our website.
  
  If you did not request this password reset, please ignore this email. Your password will remain unchanged.
  
  Thank you,
 ${process.env.PROJECT_NAME}
 `;
};
export { generateOTP, getEmailOTPMassage, getForgetPasswordmassage };

