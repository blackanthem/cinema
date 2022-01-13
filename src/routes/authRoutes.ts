import express from "express";
import { isLoggedIn } from "../middlewares/loggedIn";
import { sessionMiddleWare } from "../middlewares/session";
import { passport } from "../passport";
import * as movieController from "../controllers/movie.controller";
import * as userController from "../controllers/user.controller";

const authRouter = express.Router();

authRouter.use(sessionMiddleWare);
authRouter.use(passport.initialize());
authRouter.use(passport.session());
authRouter.use(isLoggedIn);

authRouter.put("/movies/:movieId", movieController.updateMovie);
authRouter.get("/user", userController.loggedIn);

export { authRouter };
