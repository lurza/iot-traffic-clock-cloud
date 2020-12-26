import startServer from "./http/index.js";
import startCron from "./cron/index.js";
import startMQTTClient from "./mqtt/index.js";

startServer();
startCron();
startMQTTClient();
