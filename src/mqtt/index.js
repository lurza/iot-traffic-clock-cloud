import MQTT from "async-mqtt";
import { MQTT_BROKER, MQTT_USER, MQTT_PASSWORD } from "../config.js";

let client;

const callbacksByTopic = new Map();

function addSubscription(topic, callback) {
    client.subscribe(topic);
    callbacksByTopic.set(topic, callback);
}

function handleMessage(topic, message) {
    const callback = callbacksByTopic.get(topic);
    callback(message.toString());
}

export default async function startMQTTClient() {
    client = await MQTT.connectAsync(`mqtt://${MQTT_BROKER}`, {
        username: MQTT_USER,
        password: MQTT_PASSWORD,
    });

    client.on("message", handleMessage);

    addSubscription("ping", async () => {
        await client.publish("pong", "pong");
    });

    console.log("MQTT client started!");
}

export function getMQTTClient() {
    return client;
}
