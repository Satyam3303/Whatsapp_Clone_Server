import express from "express";

//Controller
import { uploadFile, getImage } from "../controller/index.js";

// Middleware
import upload from "../utils/upload.js";

const fileRoutes = express.Router();

// ==================== File Routes ==================== //
fileRoutes.post("/upload", upload.single("file"), uploadFile);
fileRoutes.get("/:filename", getImage);

export default fileRoutes;
