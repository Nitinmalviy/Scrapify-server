import AdminNotification from "../models/AdminNotification.model.js";

export const addAdminNotification = async (request, response) => {
    const { userId, scrapProductId, message } = request.body;
    try {
        const newNotification = new AdminNotification({
            userId,
            scrapProductId,
            message,
            createdAt: new Date()
        });
        const savedNotification = await newNotification.save();
        response.status(201).json(savedNotification);
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
    }
};


export const getAdminNotifications = async (requset, response) => {
    try {
        const notifications = await AdminNotification.find().populate("ScrapProductId").populate("userId");
        response.status(200).json(notifications);
    } catch (error) {
        console.log("Error in Getting Admin Notification ", error);
        response.status(500).json({ error: "Internal server error" });
    }
};
export const getAdminNotificationByUserId = async (requset, response) => {
    try {
        const { userId } = requset.params;
        const notifications = await AdminNotification.find({ userId });
        response.status(200).json(notifications);
    } catch (error) {
        console.log("Error in Getting Admin Notification ", error);
        response.status(500).json({ error: "Internal server error" });
    }
};


export const updateAdminNotification = async (request, response) => {
    const { notificationId } = request.params;
    const { read } = request.body;
    try {
        const updatedNotification = await AdminNotification.findByIdAndUpdate(
            notificationId,
            { read },
            { new: true }
        );
        if (!updateAdminNotification) {
            return response.status(404).json("Notification not found");
        }
        return response.status(200).json(updatedNotification);
    } catch (error) {
        console.log("Error in updateing notification");
        return response.status(500).json({ error: "Internal server error" });
    }
};

export const deleteAdminNotification = async (request, response) => {
    const { notificationId } = request.params;
    try {
        const deletedNotification = await AdminNotification.findByIdAndDelete(notificationId);
        return response.status(200).json(deletedNotification);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}