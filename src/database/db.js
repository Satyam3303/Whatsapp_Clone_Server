import { loggerMessages } from '../messages/index.js';
import { logger } from '../services/index.js';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_OPTIONS } = process.env;

if (!DB_USERNAME || !DB_PASSWORD || !DB_CLUSTER || !DB_OPTIONS) {
  logger.error(loggerMessages.warn.MISSING_ENV_VAR);
  throw new Error(loggerMessages.warn.MISSING_ENV_VAR);
}

const dbConnection = async () => {
  const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_OPTIONS}`;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(loggerMessages.success.DATABASE_CONNECTED);
  } catch (error) {
    logger.error(`${loggerMessages.error.DATABASE_CONN_FAILED}${error.message}`);
    process.exit(1);
  }
};

export default dbConnection;
