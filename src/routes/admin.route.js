import express from "express";
import { body, param } from "express-validator";
import {
    register,
    signIn,
    UpdateAdminname,
    removeAdminbyId,
    getadminList
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post(
    "/register",
    body("adminname", "Adminname required").notEmpty(),
    body("email", "Invalid email").isEmail(),
    body("email", "Email id is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
    body("password", "Password must have at least 6 letter").isLength({ min: 6 }),
    register
);

adminRouter.post(
    "/signIn",
    body("email", "Email required").notEmpty(),
    body("email", "Email is not valid").isEmail(),
    body("password", "Password required").notEmpty(),
    signIn
);

adminRouter.post(
    "/change-adminname",
    body("adminname", "Adminname required").notEmpty(),
    body("adminId", "AdminId required").notEmpty(),
    UpdateAdminname
);

adminRouter.delete(
    "/removeAdmin-byId/:id",
    param("id", "AdminId Required").notEmpty(),
    removeAdminbyId
);

adminRouter.get("/getAdmin-list", getadminList);

export default adminRouter;
