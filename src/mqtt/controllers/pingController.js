import { client } from "../index.js";

function handleMessage(message) {
    client.publish("pong", message);
}

export default {
    handleMessage,
};
