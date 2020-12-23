import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";

export default function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve("src", "public")));
  app.use(express.static(path.resolve("node_modules", "bootstrap", "dist")));
  app.use(morgan("tiny"));
  app.use(compression());
  app.use(cors());
}
