import { Router } from "express";
import { healthcheckController } from "@controller";

const healthcheckRouter: Router = Router();

healthcheckRouter.get("/", healthcheckController.healthcheck);

export { healthcheckRouter };
