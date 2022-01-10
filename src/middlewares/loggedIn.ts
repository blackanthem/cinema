import type { Request, Response, NextFunction } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!(req.user as any)?.code) throw { status: 401, message: "Log in" };

  next();
}
