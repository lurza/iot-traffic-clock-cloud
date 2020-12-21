import ping from "./ping.js";

export default function (app) {
    app.use("/ping", ping);
}
