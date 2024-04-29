import express from "express";
import { addVahicle, getVehicleList } from "../controllers/Vahicle.controller.js";

const VahicleRouter = express.Router();

VahicleRouter.post("/addVahicle", addVahicle);
VahicleRouter.get("/getVehicleList", getVehicleList);

export default VahicleRouter;