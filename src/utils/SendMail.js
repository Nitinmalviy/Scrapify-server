import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (recipientEmail, emailSubject, emailMessage) => {
  try {
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to: recipientEmail,
      subject: emailSubject,
      text: emailMessage,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        return true;
      } else return false;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
// sendMail("mehrapoonam379@gmail.com");

export default sendMail;
