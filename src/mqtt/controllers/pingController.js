import { getMQTTClient } from "../index.js";

function handleMessage(message) {
    const client = getMQTTClient();
    client.publish("pong", message);
}

export default {
    handleMessage,
};
