import { Router } from "express";
import { userController } from "@controller";

const userRouter: Router = Router();

userRouter.post("/", userController.createUser);

export { userRouter };
