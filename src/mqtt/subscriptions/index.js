import pingController from "../controllers/pingController.js";
import settingsController from "../controllers/settingsController.js";
import { client } from "../index.js";

const callbacksByTopic = new Map();

function addSubscription(topic, callback) {
    client.subscribe(topic);
    callbacksByTopic.set(topic, callback);
}

function handleMessage(topic, message) {
    const callback = callbacksByTopic.get(topic);
    callback(JSON.parse(message.toString()));
}

export default function () {
    client.on("message", handleMessage);

    addSubscription("ping", pingController.handleMessage);
    addSubscription("alarm/volume/increase", settingsController.increaseVolume);
    addSubscription("alarm/volume/decrease", settingsController.decreaseVolume);
    addSubscription("alarm/location/update", settingsController.updateLocation);
}
