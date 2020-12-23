import cron from "node-cron";
import checkAlarms from "./jobs/alarms.js";

export default function startCron() {
  cron.schedule("* * * * *", checkAlarms);
}
