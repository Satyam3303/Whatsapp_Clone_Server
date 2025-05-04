import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { logger }from './index.js';
import { loggerMessages } from '../messages/index.js'

dotenv.config();

// Helmet configuration for enhanced security
const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https:"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'", "https:"],
      "font-src": ["'self'", "https:", "data:"],
    },
  },
  crossOriginResourcePolicy: { policy: "same-site" },
  referrerPolicy: { policy: "no-referrer" },
  xDnsPrefetchControl: true,
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});


const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;

if(!FRONTEND_DOMAIN){
  logger.warn(loggerMessages.warn.FRONTEND_DOMAIN_MISSING)
  throw new error(loggerMessages.warn.FRONTEND_DOMAIN_MISSING)
}

// CORS configuration for Frontend Domain
const corsMiddleware = cors({
  origin: [FRONTEND_DOMAIN],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
});

// Combine middlewares
const securityMiddleware = [helmetMiddleware, corsMiddleware];

export default securityMiddleware;
