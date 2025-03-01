import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  username: process.env.REDIS_USER || "default",
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected!");
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};

connectRedis();

export default redisClient;
