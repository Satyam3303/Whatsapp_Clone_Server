import { ConversationModel } from "../model/index.js";
import { responseTemplate } from "../utils/index.js";
import { logger } from "../services/index.js";
import { loggerMessages, statusMessages } from "../messages/index.js";

//Add a New Conversation if it does not exists
const newConversation = async (request, response) => {
  try {
    const { senderId, receiverId } = request.body;

    if (!senderId || !receiverId) {
      logger.warn(loggerMessages.warn.MISSING_USER_IDS);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.MISSING_USER_IDS,
        data: null,
      });
    }

    const existingConversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      logger.info(loggerMessages.warn.CONV_EXISTS);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 409,
        message: loggerMessages.warn.CONV_EXISTS,
        data: null,
      });
    }

    const conversation = new ConversationModel({
      members: [senderId, receiverId],
    });

    const savedConversation = await conversation.save();

    if (savedConversation && savedConversation._id) {
      logger.info(loggerMessages.success.CONV_SAVED);
      return responseTemplate(response, {
        status: statusMessages.success,
        statusCode: 201,
        message: loggerMessages.success.CONV_SAVED,
        data: conversation,
      });
    } else {
      throw new Error(loggerMessages.error.CONV_NOT_SAVED);
    }
  } catch (error) {
    logger.error(`${loggerMessages.controller_error.NEW_CONV}${error.message}`);
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

//Find a Conversation Between 2 Users
const getConversation = async (request, response) => {
  try {
    const { senderId, receiverId } = request.body;

    if (!senderId || !receiverId) {
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.MISSING_USER_IDS,
        data: null,
      });
    }

    const conversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      logger.error(loggerMessages.error.CONV_NOT_FOUND);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 404,
        message: loggerMessages.error.CONV_NOT_FOUND,
        data: null,
      });
    }

    logger.info(`${loggerMessages.success.CONV_FOUND} for id ${conversation._id}`);
    return responseTemplate(response, {
      status: statusMessages.success,
      statusCode: 200,
      message: loggerMessages.success.CONV_FOUND,
      data: conversation,
    });
  } catch (error) {
    logger.error(`${loggerMessages.controller_error.GET_CONV}${error.message}`);
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

export { newConversation, getConversation };