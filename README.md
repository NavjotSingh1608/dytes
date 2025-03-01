# dytes - QR Code Generator Web App

## 📌 Overview

This is a **Full Stack QR Code Generator Web Application** that allows users to generate QR codes based on input text and retrieve previously generated QR codes using **Redis caching** for optimized performance. The app is built using **React.js** for the frontend and **Node.js + Express.js** for the backend, with **MongoDB** as the database and **Redis** for caching.

---

## 🚀 Tech Stack

### **Frontend** (Client)

- **React.js** – UI development
- **Tailwind CSS** – Styling
- **Axios** – API requests
- **React Router** – Navigation
- **Vercel** – Deployment

### **Backend** (Server)

- **Node.js** – Server-side runtime
- **Express.js** – Web framework
- **MongoDB (Mongoose)** – Database
- **Redis** – Caching system
- **jsonwebtoken (JWT)** – Authentication
- **bcrypt.js** – Password hashing
- **CORS** – Cross-origin requests handling
- **dotenv** – Environment variable management
- **QR Code Library** – QR code generation
- **Vercel** – Deployment

---

## 🌍 API Endpoints

### **Authentication**

1. **User Registration**

   - `POST /api/auth/register`
   - **Body:** `{ "username": "test", "email": "test@example.com", "password": "password123" }`
   - **Response:** `{ "message": "User registered successfully" }`

2. **User Login**

   - `POST /api/auth/login`
   - **Body:** `{ "email": "test@example.com", "password": "password123" }`
   - **Response:** `{ "token": "jwt_token_here" }`

### **QR Code Generation**

3. **Generate QR Code (with Caching)**
   - `POST /api/qrcode/generate-qr`
   - **Body:** `{ "text": "HelloWorld" }`
   - **Response:** `{ "qrCode": "data:image/png;base64,..." }`
   - **Caching Logic:**
     - If QR already exists in Redis, return cached version.
     - If not, generate a new one, store it in Redis (expires in 1 hour), and return it.

---

## 📂 Folder Structure

```
qr-code-app/
│── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Pages (Home, Login, Register)
│   │   ├── api/             # Axios API requests
│   │   ├── App.js           # Main React App
│   │   ├── index.js         # React DOM entry point
│   ├── public/              # Static files
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment Variables
│
│── backend/                 # Node.js Backend
│   ├── models/              # Mongoose Schemas
│   ├── routes/              # Express Routes
│   ├── controllers/         # Controller Logic
│   ├── middleware/          # Middleware (Auth, Validation)
│   ├── utils/               # Redis & QR Code Utilities
│   ├── index.js             # Express Server
│   ├── package.json         # Dependencies
│   ├── .env                 # Backend Environment Variables
│
│── redis/                   # Redis Setup
│── README.md                # Documentation
```

---


---

## ✅ Deployment

- **Frontend:** Vercel ([https://vercel.com/](https://vercel.com/))
- **Backend:** Vercel
- **Database:** MongoDB Atlas
- **Cache:** Redis Cloud ([https://redis.com/](https://redis.com/))

---

## 🛠️ Testing Redis Caching with Postman

1. **Send a POST request:**

   - URL: `http://localhost:5000/api/generate-qr`
   - Body: `{ "text": "HelloWorld" }`
   - Response: `{ "qrCode": "data:image/png;base64,..." }`
   - Logs: `⏳ New QR Code generated & cached`

2. **Send the same request again:**

   - Logs: `✅ Returning Cached QR Code`
   - Confirms caching is working.

3. **Change text in request body:**

   - Logs: `⏳ New QR Code generated & cached`
   - New QR is stored.

---

## 🎯 Conclusion

This app is a **full-stack solution** that efficiently generates and caches QR codes, ensuring fast performance with Redis. It follows industry best practices for authentication, caching, and deployment.

