import alarmRepo from "../data/alarmRepo.js";
import bingRoutesApi from "./bingRoutesApi.js";
import settingRepo from "../data/settingsRepo.js";
import { DEPARTURE, PREPARATION_SECONDS } from "../models/SettingKeys.js";

async function canRing(alarm) {
    const arrival = alarm.arrival;
    const departure = await settingRepo.show(DEPARTURE);
    const destination = alarm.destination;
    const travelSeconds = await bingRoutesApi.getTravelSeconds(
        departure,
        destination
    );
    const preperationSeconds = await settingRepo.show(PREPARATION_SECONDS);
    const nowEpochSeconds = new Date().getTime() / 1000;
    const arrivalEpochSeconds = new Date(arrival).getTime() / 1000;

    return (
        nowEpochSeconds + preperationSeconds + travelSeconds >=
        arrivalEpochSeconds
    );
}

function ring(id) {
    alarmRepo.destroy(id);
}

function log(id) {
    console.log("Ringing alarm: " + id);
}

export default {
    canRing,
    ring,
    log,
};
