import session from "express-session";
import { passport } from "../passport";

export const sessionMiddleWare = session({
  secret: "gota",
  resave: false,
  cookie: { maxAge: 600 * 1000, path: "/v1" },
  saveUninitialized: false,
  rolling: true,
});
