import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loggerMessages } from "./src/messages/index.js";

// Services
import {
  securityMiddleware,
  rateLimiter,
  logger,
} from "./src/services/index.js";

// Database
import dbConnection from "./src/database/db.js";

// Routes
import {
  userRoutes,
  messageRoutes,
  fileRoutes,
  conversationRoutes,
} from "./src/routes/index.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(securityMiddleware);
app.use(rateLimiter);
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use("/users", userRoutes);
app.use("/message", messageRoutes);
app.use("/file", fileRoutes);
app.use("/conversation", conversationRoutes);

// Start server
const startServer = async () => {
  try {
    const PORT = process.env.DB_PORT;

    if (!PORT) {
      throw new Error(loggerMessages.error.PORT_NOT_DEFINED);
    }

    await dbConnection();

    app.listen(PORT, () => {
      logger.info(`${loggerMessages.success.SERVER_STARTUP}${PORT}`);
    });
  } catch (error) {
    logger.error(`${loggerMessages.error.STARTUP_FAILED}${error.message}`);
    process.exit(1);
  }
};

startServer();
