import alarmRepo from "../data/alarmRepo.js";
import bingRoutesApi from "./bingRoutesApi.js";
import settingRepo from "../data/settingsRepo.js";
import {
    DEPARTURE,
    PREPARATION_SECONDS,
    VOLUME,
} from "../models/SettingKeys.js";
import { client } from "../mqtt/index.js";

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

async function ring(alarm) {
    notifyAlarm();
    removeAlarm(alarm);
    console.log(`Alarm ${alarm.id} is ringing!`);
}

async function notifyAlarm() {
    const volume = Number(await alarmRepo.show(VOLUME));
    client.publish("alarm/ring", JSON.stringify({ volume }), console.log);
}

async function removeAlarm(alarm) {
    alarmRepo.destroy(alarm.id);
}

export default {
    canRing,
    ring,
};
