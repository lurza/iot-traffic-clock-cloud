import MQTT from "async-mqtt";
import addSubscriptions from "./subscriptions/index.js";
import { MQTT_BROKER, MQTT_USER, MQTT_PASSWORD } from "../config.js";

let client;

export default async function startMQTTClient() {
    client = await MQTT.connectAsync(`mqtt://${MQTT_BROKER}`, {
        username: MQTT_USER,
        password: MQTT_PASSWORD,
    });

    addSubscriptions(client);

    console.log("MQTT client started!");
}

export function getMQTTClient() {
    return client;
}
