import QRCode from "../models/QRCode.js";
import redisClient from "../config/redis.js";
import { QRCodeStyling } from "qr-code-styling";

export const generateQRCode = async (req, res) => {
  const { data, style } = req.body;
  const userId = req.user.id;

  const cacheKey = `qr:${data}:${JSON.stringify(style)}`;
  const cachedQR = await redisClient.get(cacheKey);

  if (cachedQR) {
    return res.json({ qrCode: cachedQR });
  }

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data,
    dotsOptions: style,
  });

  const newQR = await QRCode.create({ userId, data, style });
  redisClient.setEx(cacheKey, 3600, newQR._id.toString());

  res.json({ qrCode: newQR });
};
