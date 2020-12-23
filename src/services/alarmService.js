import alarmRepo from "../data/alarmRepo.js";
import bingRoutesApi from "./bingRoutesApi.js";
import settingRepo from "../data/settingRepo.js";
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

  const nowEpoch = new Date().getTime();
  const arrivalEpoch = new Date(arrival).getTime();
  return nowEpoch + preperationSeconds + travelSeconds >= arrivalEpoch;
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
