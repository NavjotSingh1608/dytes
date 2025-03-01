import express from "express";
import { generateQRCode } from "../controllers/qrController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, generateQRCode);

export default router;
