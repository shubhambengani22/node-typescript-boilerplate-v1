require("module-alias/register");
import express, { Express } from "express";
import { getApp, logger } from "@server";

const app: Express = getApp();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server started at port ${port}`);
});
