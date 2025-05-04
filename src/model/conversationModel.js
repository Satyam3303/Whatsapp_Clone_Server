import mongoose from "mongoose";

// Define the Conversation schema
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: "A conversation must have at least two members.",
      },
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Conversation model
const ConversationModel = mongoose.model("Conversation", ConversationSchema);
export default ConversationModel;
