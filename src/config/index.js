import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 5000,
  BING_API_KEY = process.env.BING_API_KEY;
