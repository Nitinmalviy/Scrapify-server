
import express from "express";
import { addNotification,deleteNotification,getNotification,markRead } from "../controllers/notification.controller.js";

const NotificationRouter = express.Router();
NotificationRouter.post("/addNotification",addNotification);
NotificationRouter.get("/getNotification/:userId",getNotification);
NotificationRouter.put("/mark-read/:notificationId",markRead);
NotificationRouter.delete("/delete-notification/:notificationId",deleteNotification);

export default NotificationRouter;
