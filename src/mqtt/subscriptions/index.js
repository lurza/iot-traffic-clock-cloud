import pingController from "../controllers/pingController.js";
const callbacksByTopic = new Map();

function addSubscription(client, topic, callback) {
    client.subscribe(topic);
    callbacksByTopic.set(topic, callback);
}

function handleMessage(topic, message) {
    const callback = callbacksByTopic.get(topic);
    callback(message.toString());
}

export default function (client) {
    client.on("message", handleMessage);

    addSubscription(client, "ping", pingController.handleMessage);
}
