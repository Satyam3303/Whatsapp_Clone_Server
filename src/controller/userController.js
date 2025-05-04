import { UserModel } from "../model/index.js";

import { responseTemplate } from "../utils/index.js";
import { logger } from "../services/index.js";
import { loggerMessages, statusMessages } from "../messages/index.js";

// Add a new user
const addUser = async (request, response) => {
  try {
    const { sub } = request.body;

    if (!sub) {
      logger.warn(loggerMessages.warn.MISSING_SUB);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.MISSING_SUB,
        data: null,
      });
    }

    const existingUser = await UserModel.findOne({ sub });

    if (existingUser) {
      return responseTemplate(response, {
        status: statusMessages.success,
        statusCode: 409,
        message: loggerMessages.warn.USER_EXISTS,
        data: null,
      });
    }

    const newUser = new UserModel(request.body);

    const savedUser = await newUser.save();

    if (savedUser && savedUser._id) {
      logger.info(loggerMessages.success.USER_ADDED);
      return responseTemplate(response, {
        status: statusMessages.success,
        statusCode: 201,
        message: loggerMessages.success.USER_ADDED,
        data: null,
      });
    } else {
      throw new Error(loggerMessages.error.USER_NOT_SAVED);
    }
  } catch (error) {
    logger.error(`${loggerMessages.controller_error.ADD_USER}${error.message}`);
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

//Get all Users
const getAllUsers = async (request, response) => {
  try {
    const users = await UserModel.find();

    if (!users || users.length == 0) {
      logger.error(loggerMessages.error.USER_NOT_FOUND);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 404,
        message: loggerMessages.error.USER_NOT_FOUND,
        data: null,
      });
    }

    logger.info(loggerMessages.success.ALL_USERS_FOUND);
    return responseTemplate(response, {
      status: statusMessages.success,
      statusCode: 200,
      message: loggerMessages.success.ALL_USERS_FOUND,
      data: users,
    });
  } catch (error) {
    logger.error(
      `${loggerMessages.controller_error.GET_ALL_USERS}${error.message}`
    );
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

// Get User Details by Email
const getUser = async (request, response) => {
  try {
    const { email } = request.body;

    if (!email) {
      logger.warn(loggerMessages.warn.EMAIL_IS_REQ);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.EMAIL_IS_REQ,
        data: null,
      });
    }

    const user = await UserModel.find().where("email").equals(email);

    if (!user || user.length === 0) {
      logger.error(loggerMessages.error.USER_NOT_FOUND);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 404,
        message: loggerMessages.error.USER_NOT_FOUND,
        data: null,
      });
    }

    logger.info(loggerMessages.success.USER_FOUND);
    return responseTemplate(response, {
      status: statusMessages.success,
      statusCode: 200,
      message: loggerMessages.success.USER_FOUND,
      data: user[0],
    });
  } catch (error) {
    logger.error(`${loggerMessages.controller_error.GET_USER}${error.message}`);
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

export { addUser, getAllUsers, getUser };
