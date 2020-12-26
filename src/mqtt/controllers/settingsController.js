import repo from "../../data/settingsRepo.js";
import { VOLUME, DEPARTURE } from "../../models/SettingKeys.js";

async function increaseVolume(message) {
    const volume = Number(await repo.show(VOLUME));
    await repo.update(VOLUME, volume + message.amount);
}

async function decreaseVolume(message) {
    const volume = Number(await repo.show(VOLUME));
    await repo.update(VOLUME, volume - message.amount);
}

function updateLocation(message) {
    repo.update(DEPARTURE, message.location);
}

export default {
    increaseVolume,
    decreaseVolume,
    updateLocation,
};
