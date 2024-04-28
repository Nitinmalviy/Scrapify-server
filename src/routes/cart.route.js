import express from "express";
import { addToCart, decreaseQuantity, fetchCart, increaseQuantity, removeCartItems } from "../controller/cart.controller.js";


const cartRouter = express.Router();

router.post("/addToCart",addToCart);
router.get("/fetchCart/:userId",fetchCart);
router.delete("/removeCartItems",removeCartItems);
router.put("/increaseQuantity",increaseQuantity);
router.put("/decreseQuantity",decreaseQuantity);

export default cartRouter;