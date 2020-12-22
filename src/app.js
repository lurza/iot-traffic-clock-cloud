import express from "express";
import addMiddleware from "./middleware/index.js";
import addRoutes from "./routes/index.js";
import addViews from "./views/index.js";
import { SERVER_PORT } from "./config/index.js";

const app = express();

addViews(app);
addMiddleware(app);
addRoutes(app);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
