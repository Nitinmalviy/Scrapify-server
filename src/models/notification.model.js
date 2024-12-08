import mongoose from "mongoose";

// Schema
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "warning", "error"], default: "info" },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },{versionKey : false}
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
