import { Request, Response, NextFunction } from "express";

export const healthcheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ result: "ok" });
  next();
};
