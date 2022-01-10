import type { Request, Response, NextFunction } from "express";
import handleHttpError from "../utils/handleHttpError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  handleHttpError(res, error);
}
