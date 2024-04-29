import express from "express";
import { addVahicle } from "../controllers/Vahicle.controller.js";

const VahicleRouter = express.Router();

VahicleRouter.post("/addVahicle", addVahicle);

export default VahicleRouter;