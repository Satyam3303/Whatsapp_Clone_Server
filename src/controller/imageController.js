import mongoose from "mongoose";
import grid from "gridfs-stream";
import dotenv from "dotenv";
import { logger } from "../services/index.js";
import { loggerMessages, statusMessages } from "../messages/index.js";
import responseTemplate from "../utils/responseTemplate.js";

dotenv.config();

const SERVER_DOMAIN = process.env.SERVER_DOMAIN;

if (!SERVER_DOMAIN) {
  logger.error(loggerMessages.warn.SERVER_DOMAIN_MISSING);
  throw new Error(loggerMessages.warn.SERVER_DOMAIN_MISSING);
}

let gfs;
let gridFsBucket;

// Initialize GridFS once MongoDB connection is open
const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "fs" });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
  logger.info(loggerMessages.success.GRIDFS_INI);
});

// Upload File Controller
const uploadFile = async (request, response) => {
  try {
    if (!request.file) {
      logger.warn(loggerMessages.warn.NO_FILE_UPLOADED);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.NO_FILE_UPLOADED,
        data: null,
      });
    }

    const imageUrl = `${SERVER_DOMAIN}/file/${request.file.filename}`;

    logger.info(
      `${loggerMessages.success.FILE_UPLOADED}${request.file.filename}`
    );
    return responseTemplate(response, {
      status: statusMessages.success,
      statusCode: 200,
      message: loggerMessages.success.FILE_UPLOADED,
      data: { imageUrl },
    });
  } catch (error) {
    logger.error(
      `${loggerMessages.controller_error.FILE_UPLOAD}${error.message}`
    );
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

// Get Image Controller
const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });

    if (!file || !file._id) {
      logger.error(
        `${loggerMessages.error.FILE_NOT_FOUND}${request.params.filename}`
      );
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 404,
        message: loggerMessages.error.FILE_NOT_FOUND,
        data: null,
      });
    }

    logger.info(`${loggerMessages.success.STREAMING_FILE}${file.filename}`);
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    logger.error(
      `${loggerMessages.controller_error.GET_IMAGE} ${error.message}`
    );
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error,
      message,
      data: null,
    });
  }
};

export { uploadFile, getImage };
