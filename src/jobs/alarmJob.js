import repo from "../data/alarmRepo.js";
import bingRoutesApi from "../services/bingRoutesApi.js";

function canRing(arrival, preperationSeconds, travelSeconds) {
  const nowEpoch = new Date().getTime();
  const arrivalEpoch = new Date(arrival).getTime();
  return nowEpoch + preperationSeconds + travelSeconds >= arrivalEpoch;
}

function ring(id) {
  console.log(`${id} is ringing!`);
  repo.destroy(id);
}

export default async function checkAlarms() {
  const alarms = await repo.index();

  const departure = "Jozef Lievensstraat 8, 8800 Roeselare"; // TODO get from settings
  const preperationSeconds = 15 * 60;

  alarms.forEach(async ({ id, destination, arrival }) => {
    const travelSeconds = await bingRoutesApi.getTravelSeconds(
      departure,
      destination
    );

    if (canRing(arrival, preperationSeconds, travelSeconds)) {
      ring(id);
    }
  });
}
