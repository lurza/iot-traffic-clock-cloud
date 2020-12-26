import MQTT from "async-mqtt";
import addSubscriptions from "./subscriptions/index.js";
import { MQTT_BROKER, MQTT_USER, MQTT_PASSWORD } from "../config.js";

export let client;

export default async function startMQTTClient() {
    client = await MQTT.connectAsync(`mqtt://${MQTT_BROKER}`, {
        username: MQTT_USER,
        password: MQTT_PASSWORD,
    });

    addSubscriptions();

    console.log("MQTT client started!");
}
