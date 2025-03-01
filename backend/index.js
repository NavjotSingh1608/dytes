import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

dotenv.config({ path: './.env' }); 

connectDB();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://dytes-frontend.vercel.app", // Add frontend URL
  "http://localhost:5173", // For local testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true, // If using cookies or auth tokens
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Explicitly handle preflight requests
app.options("*", cors());
app.options("/api/auth/forgot-password", cors());
app.use("/api/auth", authRoutes);
app.use("/api/qrcode", qrRoutes);

const PORT = process.env.PORT;

app.listen(PORT || 8000, () => console.log(`server started at http://localhost:${PORT}`) );