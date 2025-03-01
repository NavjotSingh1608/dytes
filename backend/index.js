import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";

dotenv.config()
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true, 
}));

app.use("/api/auth", authRoutes);
app.use("/api/qrcode", qrRoutes);

const PORT = process.env.PORT;

app.listen(PORT || 8000, () => console.log(`server started at http://localhost:${PORT}`) );