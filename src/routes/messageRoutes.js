import express from "express";

//Controller
import { newMessage, getMessages } from "../controller/index.js";

const messageRoutes = express.Router();

// ==================== Message Routes ==================== //
messageRoutes.post("/add", newMessage);
messageRoutes.get("/get/:id", getMessages);

export default messageRoutes;
