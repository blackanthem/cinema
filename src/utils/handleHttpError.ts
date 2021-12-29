import type { Response as Res } from "express";

export default function handleHttpError(res: Res, error: any) {
  if (error.isJoi) return res.status(422).send(error.message);
  if (error.status) return res.status(error.status).send(error.message);

  return res.status(400).send(error);
}
