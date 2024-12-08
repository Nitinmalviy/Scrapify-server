import express from "express";
import { addMessage, deleteMessage, getMessage, getMessagesByMessageId, getMessagesByUserId, updateMessage } from "../controllers/message.controller.js";

const MessageRouter = express.Router();


MessageRouter.post("/addMessage", addMessage);
MessageRouter.get("/getMessage", getMessage);
MessageRouter.get("/getMessage-byuserId/:userId", getMessagesByUserId);
MessageRouter.get("/getMessage-bymessageId/:messageId", getMessagesByMessageId);
MessageRouter.put("/updateMessage/:messageId", updateMessage);
MessageRouter.delete("/deleteMessage/:messageId", deleteMessage);

export default MessageRouter;