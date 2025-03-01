import QRCode from "qrcode";
import redisClient from "../config/redis.js";

export const generateQR = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const cachedQRCode = await redisClient.get(text);
    if (cachedQRCode) {
      console.log("Cache hit - returning cached QR code");
      return res.json({ qrCode: cachedQRCode });
    }

    const qrCodeDataURL = await QRCode.toDataURL(text);

    await redisClient.setEx(text, 86400, qrCodeDataURL);

    console.log("Cache miss - QR code generated and stored in Redis");
    res.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error("Error generating QR Code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
