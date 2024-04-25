import Message from "../models/message.model.js";

export const addMessage = async (request, response) => {
    try {
        if (!request.body) {
            return response.status(400).json({ error: "all deatils required" });
        }
        const { sender, receiver, scrapProductId, message, vehicleId } = request.body;
        const messageObj = await Message.create({ sender, receiver, scrapProductId, message, vehicleId });
        return response.status(201).json({ messageObj: messageObj });
    } catch (error) {
        console.log("Error in adding message ", error);
        response.status(500).json({ error: "internal server error" });
    }
};


export const getMessagesByMessageId = async (request, response) => {
    try {
        const messageId = request.params.messageId;
        if (!messageId) {
            return response.status(500).json({ message: "messageId required" });
        }
        const messages = await Message.find({ _id: messageId }).populate("scrapProductId");
        if (!messages) {
            return response.status(404).json({ message: "messageId not found" });
        }
        return response.status(200).json({ messages });
    } catch (error) {
        console.error("Error gettaing messages by messageId", error);
        response.status(500).json({ message: "Internal server error" });
    }
};

export const getMessagesByUserId = async (request, response) => {
    try {
        const userId = request.params.userId;
        if (!userId) {
            return response.status(500).json({ message: "userId required" });
        }
        const messages = await Message.find({ receiver: userId }).populate("scrapProductId");
        if (!messages) {
            return response.status(404).json({ message: "userId not found" });
        }
        return response.status(200).json({ messages });
    } catch (error) {
        console.error("Error gettaing messages by userid", error);
        response.status(500).json({ message: "Internal server error" });
    }
};


export const getMessage = async (request, response) => {
    try {
        const messages = await Message.find().populate("scrapProductId");
        response.status(200).json({ messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        response.status(500).json({ message: "Internal server error" });
    };
}


export const deleteMessage = async (request, response) => {
    try {
        const messageId = request.params.messageId;
        const deletedMessage = await Message.findByIdAndDelete({ _id: messageId });
        if (!deletedMessage) {
            return response.status(404).json({ message: "Message not found" });
        }
        response.status(200).json({ message: "Message deleted successfully", deletedMessage });
    } catch (error) {
        console.error("Error deleting message:", error);
        response.status(500).json({ message: "Internal server error" });
    }
};



export const updateMessage = async (request, response) => {
    try {
        const messageId = request.params.messageId;
        const { sender, receiver, scrapProductId, message, vehicleId } = request.body;
        const updatedMessage = await Message.findByIdAndUpdate(
            { _id: messageId },
            { sender, receiver, scrapProductId, message, vehicleId },
            { new: true }
        );
        if (!updatedMessage) {
            return response.status(404).json({ message: "Message not found" });
        }
        response.status(200).json({ message: "Message updated successfully", updatedMessage });
    } catch (error) {
        console.error("Error updating message:", error);
        response.status(500).json({ message: "Internal server error" });
    }
};
