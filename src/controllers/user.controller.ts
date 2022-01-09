import type { Request as Req, Response as Res } from "express";
import { userSchema } from "../joi";
import { saveUser } from "../services/user.service";
import handleHttpError from "../utils/handleHttpError";

export async function postUser(req: Req, res: Res) {
  try {
    const user = await userSchema.postUser(req.body);
    const result = await saveUser(user);

    res.send(result);
  } catch (error) {
    handleHttpError(res, error);
  }
}
