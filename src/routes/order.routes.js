import express from "express";
import { addOrder, deleteOrderById, deleteOrdersByUserId, getAllOrders, getOrderById, getOrdersByUserId, removeProductFromOrder, updateOrderByUserId, updateOrderStatus } from "../controllers/order.controller.js";

const OrderRouter = express.Router();



OrderRouter.post("/addOrder", addOrder);
OrderRouter.get("/getAllOrder", getAllOrders);
OrderRouter.get("/getOrder/:orderId", getOrderById);
OrderRouter.put("/updateOrderStatus/:orderId", updateOrderStatus);
OrderRouter.delete("/deleteOrderById/:orderId", deleteOrderById);
OrderRouter.get("/getOrdersByUserId/:userId", getOrdersByUserId);
OrderRouter.put("/updateOrderByUserId/:userId", updateOrderByUserId);
OrderRouter.delete("/deleteOrdersByUserId/:userId", deleteOrdersByUserId);
OrderRouter.delete("/removeProductFromOrder", removeProductFromOrder);

export default OrderRouter;