import mongoose from "mongoose";

const QRCodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  style: {
    type: Object,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("QRCode", QRCodeSchema);
