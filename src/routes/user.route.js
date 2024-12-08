import express from "express";
import { body, param } from "express-validator";
import {
  register,
  saveOTP,
  signIn,
  changePassword,
  UpdateUsername,
  getuserById,
  getuserByEmail,
  getuserByContect,
  getuserByUsername,
  getuserList,
  blockUserById,
  unblockUserById,
} from "../controllers/user.controller.js";
import {
  forgetPasswordOTP,
  sendOTP,
  verifyEmail,
} from "../middlewares/userotp.middleware.js";

const userRouter = express.Router();

// User Authentication Router
userRouter.post(
  "/sendOTP",
  body("email", "email is required").notEmpty(),
  body("username", "username is required").notEmpty(),
  sendOTP,
  saveOTP
);

userRouter.post(
  "/register",
  body("email", "Email required").notEmpty(),
  body("username", "Username required").notEmpty(),
  body("username", "Username required").notEmpty(),
  body("username", "Username must be at least 3 characters long").isLength({
    min: 3,
  }),

  body("contact", "contact number required").notEmpty(),
  body("password", "Password required").notEmpty(),

  body("password", "pleas Enter Strong password").isLength({ min: 5 }),

  verifyEmail,
  register
);

userRouter.post(
  "/signIn",
  body("email", "Email required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  body("password", "Password required").notEmpty(),
  signIn
);
userRouter.post(
  "/forget-password",
  body("email", "Email required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  forgetPasswordOTP,
  saveOTP
);

userRouter.post(
  "/verify-otp",
  body("email", "email required").notEmpty(),
  body("otp", "Otp required").notEmpty(),
  verifyEmail
);

userRouter.post(
  "/change-password",
  body("email", "email required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  body("password", "Password required").notEmpty(),
  // body("password", "pleas Enter Strong password").isStrongPassword(),
  body("password", "pleas Enter Strong password").isLength({ min: 6 }),
  changePassword
);

userRouter.post(
  "/change-username",
  body("username", "Username requird").notEmpty(),
  body("userId", "UserId requird").notEmpty(),
  UpdateUsername
);

// get user Router
userRouter.get(
  "/getUser-byid/:userId",
  param("userId", "UserId Required").notEmpty(),
  getuserById
);
userRouter.get(
  "/getUser-byemail/:email",
  param("email", "email Required").notEmpty(),
  param("email", "Invalid email").isEmail(),
  getuserByEmail
);
userRouter.get(
  "/getUser-bycontact/:contact",
  param("contact", "contact number Required").notEmpty(),
  getuserByContect
);
userRouter.get(
  "/getUser-byusername/:username",
  param("username", "username Required").notEmpty(),
  getuserByUsername
);
userRouter.get("/getUser-list", getuserList);

// Block - unblock
userRouter.put(
  "/blockuser-byid/:userId",
  param("userId", "userId Required").notEmpty(),
  blockUserById
);

userRouter.put(
  "/unblockuser-byid/:userId",
  param("userId", "userId Required").notEmpty(),
  unblockUserById
);
export default userRouter;
