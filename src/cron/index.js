import cron from "node-cron";
import alarmJob from "./jobs/alarmJob.js";

export default function startCron() {
    cron.schedule("* * * * *", alarmJob);

    console.log("Cron jobs started!");
}
