import mongoose from "mongoose";

// Define the Message schema
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      trim: true,
    },
    senderId: {
      type: String,
      required: true,
      trim: true,
    },
    receiverId: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      default: "",
      trim: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "audio", "file"],
      default: "text",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Message model
const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
