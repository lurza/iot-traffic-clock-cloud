import pingRouter from "./pingRouter.js";
import alarmRouter from "./alarmRouter.js";
import settingRouter from "./settingRouter.js";

export default function (app) {
  app.use("/api/ping", pingRouter);
  app.use("/api/alarms", alarmRouter);
  app.use("/api/settings", settingRouter);
}
