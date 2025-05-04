import { ConversationModel, MessageModel } from "../model/index.js";

import { responseTemplate } from "../utils/index.js";
import { logger } from "../services/index.js";
import { loggerMessages, statusMessages } from "../messages/index.js";

//Send a New Message
const newMessage = async (req, response) => {
  try {
    const { conversationId, senderId, receiverId, text, type } = req.body;

    if (!conversationId || !senderId || !receiverId || !text || !type) {
      logger.warn(loggerMessages.warn.MISSING_REQUIRED_FIELDS);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.MISSING_REQUIRED_FIELDS,
        data: null,
      });
    }

    // Create a new message instance
    const newMessage = new MessageModel({
      conversationId,
      senderId,
      receiverId,
      text,
      type,
    });

    // Save the new message
    await newMessage.save();

    // Update the conversation with the latest message text
    await ConversationModel.findByIdAndUpdate(conversationId, {
      $set: { message: text },
    });

    logger.info(
      `${loggerMessages.success.MESSAGE_SENT} for conversationId: ${conversationId}`
    );
    return responseTemplate(response, {
      status: statusMessages.success,
      statusCode: 200,
      message: loggerMessages.success.MESSAGE_SENT,
      data: null,
    });
  } catch (error) {
    logger.error(
      `${loggerMessages.controller_error.NEW_MESSAGE}${error.message}`
    );
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

// Get All Messages by Conversation ID
const getMessages = async (req, response) => {
  try {
    const { id: conversationId } = req.params;

    if (!conversationId) {
      logger.warn(loggerMessages.warn.CONVERSATION_ID_MISSING);
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.warn.CONVERSATION_ID_MISSING,
        data: null,
      });
    }

    const messages = await MessageModel.find({ conversationId });

    if (messages.length === 0) {
      logger.info(
        `${loggerMessages.error.NO_MESSAGES_FOUND} for conversation: ${conversationId}`
      );
      return responseTemplate(response, {
        status: statusMessages.fail,
        statusCode: 400,
        message: loggerMessages.error.NO_MESSAGES_FOUND,
        data: null,
      });
    }

    logger.info(
      `${loggerMessages.success.MESSAGES_FOUND} for conversation: ${conversationId}`
    );
    return responseTemplate(response, {
      status: statusMessages.success,
      statusCode: 200,
      message: loggerMessages.success.MESSAGES_FOUND,
      data: messages,
    });
  } catch (error) {
    logger.error(
      `${loggerMessages.controller_error.GET_MESSAGES}${error.message}`
    );
    return responseTemplate(response, {
      status: statusMessages.ise,
      statusCode: 500,
      message: error.message,
      data: null,
    });
  }
};

export { newMessage, getMessages };
