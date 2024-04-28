import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// Admin register
export const register = async (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response
                .status(401)
                .json({ error: "Bad request", errorMessage: errors.array() });
        let password = request.body.password;
        let saltkey = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, saltkey);
        request.body.password = password;
        let result = await Admin.create(request.body);
        result = result.toObject();
        delete result.password;
        return response
            .status(200)
            .json({ message: "Admin SignUp Success", admin: result });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: error.message });
    }
};

// Admin SingIn
export const signIn = async (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const { email, password } = request.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return response
                .status(400)
                .json({ message: "Unauthoried user, please check your email" });
        }
        if (bcrypt.compareSync(password, admin.password)) {
            const token = generateToken(email);
            return response.status(200).json({
                message: " Admin Sign in success...",
                user: { ...admin.toObject(), password: undefined },
                token,
            });
        } else {
            return response.status(400).json({
                message: "Unauthorized admin, please check your email or password",
            });
        }
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: "Internal Server error" });
    }
};

// Admin Name change
export const UpdateAdminname = async (request, response, next) => {
    try {
        const { adminname, adminId } = request.body;
        const result = await Admin.updateOne(
            { _id: adminId },
            { $set: { adminname } }
        );
        if (result.modifiedCount) {
            return response.status(200).json({ message: "Updated successfully" });
        } else {
            return response.status(400).json({ message: "AdminId Not Found" });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json("Internal server Error");
    }
};

export const removeAdminbyId = async (request, response, next) => {
    try {
        let id = request.params.id;
        const errors = await validationResult(id);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        let admin = await Admin.findOne({ _id: id });
        if (admin) {
            await Admin.deleteOne({ _id: id });
            return response
                .status(200)
                .json({ message: "Admin deleted successfully" });
        }
        return response.status(401).json({ error: "Bad request (id not found)" });
    } catch (err) {
        console.error(err.message);
        return response.status(500).json({ error: "Internal server error" });
    }
};

// Get all Admins
export const getadminList = async (request, response, next) => {
    try {
        const result = await Admin.find();
        if (result.length > 0) {
            result.forEach((admin) => (admin.password = undefined));
            return response.status(200).json({ admin: result });
        } else {
            return response.status(400).json({ massage: "Admin Not Found" });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json("Internal server Error");
    }
};

const generateToken = (email) => {
    let payload = { subject: email };
    return jwt.sign(payload, process.env.JWT_SECRET);
};
