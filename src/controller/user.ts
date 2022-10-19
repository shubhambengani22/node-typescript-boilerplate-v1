import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { userService } from "@services";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, role, password } = req.body;

  try {
    const userInput: Prisma.UserCreateInput = {
      name,
      email,
      role,
      password,
    };

    const createdUser = await userService.createUser(userInput);

    res.status(201).send(createdUser.serialize());
  } catch (err: any) {
    res.status(err.statusCode).send(err);
  }
};
