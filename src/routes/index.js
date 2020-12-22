import ping from "./pingRouter.js";
import alarms from "./alarmRouter.js";

export default function (app) {
  app.use("/api/ping", ping);
  app.use("/api/alarms", alarms);
}
