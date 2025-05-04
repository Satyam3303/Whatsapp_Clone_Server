import express from "express";

//Controller
import { addUser, getAllUsers, getUser } from "../controller/index.js";

const userRoutes = express.Router();

// ==================== User Routes ==================== //
userRoutes.post("/add", addUser);
userRoutes.get("/all-users", getAllUsers);
userRoutes.post("/user", getUser);

export default userRoutes;
