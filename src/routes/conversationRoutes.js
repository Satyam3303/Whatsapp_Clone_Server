import express from "express";

//Controller
import {
  newConversation,
  getConversation,
} from "../controller/index.js";

const conversationRoutes = express.Router();

// ================= Conversation Routes =============== //
conversationRoutes.post("/add", newConversation);
conversationRoutes.post("/get", getConversation);

export default conversationRoutes;
