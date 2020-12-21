import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";

const __dirname = path.resolve();

export default function (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(morgan("tiny"));
    app.use(compression());
}
