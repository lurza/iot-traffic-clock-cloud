import alarmRepo from "../../data/alarmRepo.js";
import settingRepo from "../../data/settingRepo.js";
import SettingKeys from "../../models/SettingKeys.js";
import alarmService from "../../services/alarmService.js";
import bingRoutesApi from "../../services/bingRoutesApi.js";

export default async function checkAlarms() {
  const alarms = await getAlarms();
  const departure = await getDeparture();
  const preperationSeconds = await getPreperationSeconds();

  alarms.forEach(async ({ id, destination, arrival }) => {
    const travelSeconds = await getTravelSeconds(departure, destination);

    if (alarmService.canRing(arrival, preperationSeconds, travelSeconds)) {
      alarmService.ring(id);
      logAlarm(
        id,
        departure,
        destination,
        arrival,
        preperationSeconds,
        travelSeconds
      );
    }
  });
}

function logAlarm(
  id,
  departure,
  destination,
  arrival,
  preperationSeconds,
  travelSeconds
) {
  console.log(
    `
    Alarm ${id}: 
    Departure: ${departure}
    Destination: ${destination}
    Arrival: ${new Date(arrival).toLocaleString()}
    Now: ${new Date().toLocaleString()}
    Preperation time: ${Math.floor(preperationSeconds / 60)}min
    Travel time: ${Math.floor(travelSeconds / 60)}min
    `
  );
}

async function getAlarms() {
  return await alarmRepo.index();
}

async function getDeparture() {
  return (await settingRepo.show(SettingKeys.DEPARTURE)).value;
}

async function getPreperationSeconds() {
  return (await settingRepo.show(SettingKeys.PREPARATION_SECONDS)).value;
}

async function getTravelSeconds(departure, destination) {
  return await bingRoutesApi.getTravelSeconds(departure, destination);
}
