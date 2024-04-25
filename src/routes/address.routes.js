import express from "express"
import { addAddress, deleteAddressByUserId, getAddressByUserId, updateAddressById } from "../controllers/address.controller.js";

const AddressRouter = express.Router();


AddressRouter.post("/addAddress", addAddress);
AddressRouter.get("/getAddress/:userId", getAddressByUserId);
AddressRouter.put("/updateAddress/:userId", updateAddressById);
AddressRouter.delete("/deleteAddress/:userId", deleteAddressByUserId);

export default AddressRouter;