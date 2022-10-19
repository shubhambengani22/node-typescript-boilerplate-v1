require("module-alias/register");
import express, { Express } from "express";
import expressWinston from "express-winston";
import morgan from "morgan";
import { healthcheckRouter, userRouter } from "@routes";
import { logger } from "@server";

export const getApp = (): Express => {
  const app: Express = express();
  const router: express.Router = express.Router();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.use(expressWinston.logger({ winstonInstance: logger }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept-Language"
    );
    next();
  });

  router.use("/healthcheck", healthcheckRouter);
  router.use("/user", userRouter);

  app.use("/api", router);

  return app;
};
