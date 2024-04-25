
import express from "express";
import { addAdminNotification, deleteAdminNotification, getAdminNotificationByUserId, getAdminNotifications, updateAdminNotification } from "../controllers/AdminNotification.controller.js";


const AdminNotificationRouter = express.Router();
AdminNotificationRouter.post("/addNotification", addAdminNotification);
AdminNotificationRouter.get("/getNotification", getAdminNotifications);
AdminNotificationRouter.get("/getNotification-ByuserId/:userId", getAdminNotificationByUserId);
AdminNotificationRouter.put("/mark-read/:notificationId", updateAdminNotification);
AdminNotificationRouter.delete("/delete-notification/:notificationId", deleteAdminNotification);

export default AdminNotificationRouter;
