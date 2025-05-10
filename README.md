# 📦 Whatsapp Clone - Node.js Backend Server

This is the backend API server for the **Whatsapp Clone** built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. It features a robust, secure, and well-structured API with support for real-time messaging, file uploads, and enhanced security practices.

---
## Note

This Build Requires The Socket Setup and the Frontend Setup as well.
 - Frontend Setup ->
 - Socket Setup -> https://github.com/Satyam3303/Whatsapp_Clone_Socket
---

## 🚀 Features

- ✅ RESTful API with Express
- ✅ MongoDB integration via Mongoose
- ✅ File uploads using GridFS
- ✅ Secure HTTP headers with **Helmet**
- ✅ Cross-origin support with **CORS**
- ✅ Rate limiting for abuse protection
- ✅ Centralized and structured logging using **Winston**
- ✅ Response templates for consistent API responses
- ✅ Modular architecture (controllers, routes, middlewares, utilities)
- ✅ Environment-based configuration via **dotenv**

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- GridFS (for file storage)
- Helmet (security)
- CORS (frontend domain restriction)
- express-rate-limit (rate limiting)
- Winston (for structured logging)
- dotenv (environment config)

---

## 🧰 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/username/repo.git
cd repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root.

### 4. Run the server

```bash
nodemon server.js
```

---

## Security & Middleware

- Helmet: Sets secure HTTP headers, including CSP, HSTS, XSS protection, etc.
- CORS: Allows requests only from the configured frontend domain.
- Rate Limiting: Limits requests to avoid abuse and DoS attacks. 
- Validation & Logging: Custom response templates, input checks, and Winston logs.

## Logging (Winston)

- logs/combined.log: All logs
- logs/error.log: Only error logs
- Every controller event, API call, and error is logged

## File Uploads

- Uses GridFS (MongoDB) for storing images/files.

Built with care and lots of ☕ — Happy Coding!
