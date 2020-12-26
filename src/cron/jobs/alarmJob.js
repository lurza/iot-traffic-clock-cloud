import alarmRepo from "../../data/alarmRepo.js";
import alarmService from "../../services/alarmService.js";

export default async function checkAlarms() {
    const alarms = await alarmRepo.index();

    for (let alarm of alarms) {
        if (await alarmService.canRing(alarm)) {
            alarmService.ring(alarm);
        }
    }
}
