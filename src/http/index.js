import express from "express";
import addMiddleware from "./middleware/index.js";
import addRoutes from "./routes/index.js";
import { SERVER_PORT } from "../config.js";

export default function startServer() {
    const app = express();

    addMiddleware(app);
    addRoutes(app);

    app.listen(SERVER_PORT, () =>
        console.log(`HTTP server started! (port:${SERVER_PORT})`)
    );
}
