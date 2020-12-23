import alarmRepo from "../data/alarmRepo.js";

function canRing(arrival, preperationSeconds, travelSeconds) {
  const nowEpoch = new Date().getTime();
  const arrivalEpoch = new Date(arrival).getTime();
  return nowEpoch + preperationSeconds + travelSeconds >= arrivalEpoch;
}

function ring(id) {
  alarmRepo.destroy(id);
}

export default {
  canRing,
  ring,
};
