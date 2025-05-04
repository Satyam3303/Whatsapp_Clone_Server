import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import { logger } from "../services/index.js";
import { loggerMessages } from "../messages/index.js";

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_OPTIONS } = process.env;

if (!DB_USERNAME || !DB_PASSWORD || !DB_CLUSTER || !DB_OPTIONS) {
  logger.error(loggerMessages.warn.MISSING_ENV_VAR);
  throw new Error(loggerMessages.warn.MISSING_ENV_VAR);
}

const storage = new GridFsStorage({
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_OPTIONS}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (request, file) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

    const isValid = allowedTypes.includes(file.mimetype);

    if (!isValid) {
      const error = new Error(loggerMessages.error.INVALID_FILE_TYPE);
      logger.error(loggerMessages.error.INVALID_FILE_TYPE);
      error.statusCode = 400;
      throw error;
    }

    logger.info(loggerMessages.success.FILE_UPLOADED);
    
    return {
      bucketName: "photos",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

// Initialize multer with configured GridFS storage
const upload = multer({ storage });

export default upload;
