import express from "express";
import { passport } from "../passport";
import * as movieController from "../controllers/movie.controller";
import * as userController from "../controllers/user.controller";
import { sessionMiddleWare } from "../middlewares/session";

const router = express.Router();

router.get("/movies", movieController.getMovies);

router.get("/search-movie", movieController.getMovieSearchResults);
router.post("/movie", movieController.postMovie);

router.post("/user", userController.postUser);
router.post(
  "/login",
  sessionMiddleWare,
  passport.authenticate("local"),
  userController.loggedIn
);

export { router };
