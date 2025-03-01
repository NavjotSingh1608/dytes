import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

dotenv.config({ path: "./.env" });

connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://dytes-frontend.vercel.app", // Deployed frontend
  "http://localhost:5173", // For local testing
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/qrcode", qrRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
