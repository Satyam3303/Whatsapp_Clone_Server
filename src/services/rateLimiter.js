import rateLimit from "express-rate-limit";
import logger from './logger.js';
import { loggerMessages } from '../messages/index.js'

// Enhanced rate limiter configuration: More restrictive for critical routes
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: loggerMessages.warn.TOO_MANY_REQUEST,
  standardHeaders: true, 
  legacyHeaders: false,
  skipSuccessfulRequests: false,

  handler: (request, response, next, options) => {
    logger.warn(`${loggerMessages.warn.RATE_LIMIT_EXCEEDED} ${request.ip}`);
    response.status(options.statusCode).json({ error: options.message });
  },
});

export default rateLimiter;
