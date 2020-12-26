import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 5000,
    BING_API_KEY = process.env.BING_API_KEY,
    MQTT_BROKER = process.env.MQTT_BROKER,
    MQTT_PORT = process.env.MQTT_PORT,
    MQTT_USER = process.env.MQTT_USER,
    MQTT_PASSWORD = process.env.MQTT_PASSWORD;
