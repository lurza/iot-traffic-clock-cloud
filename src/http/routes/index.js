import pingRouter from "./routers/pingRouter.js";
import alarmRouter from "./routers/alarmRouter.js";
import settingRouter from "./routers/settingRouter.js";

export default function (app) {
  app.use("/api/ping", pingRouter);
  app.use("/api/alarms", alarmRouter);
  app.use("/api/settings", settingRouter);
}
