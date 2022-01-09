import express from "express";
import * as movieController from "./controllers/movie.controller";
import * as userController from "./controllers/user.controller";

const router = express.Router();

router.get("/movies", movieController.getMovies);

router.get("/search-movie", movieController.getMovieSearchResults);
router.post("/movie", movieController.postMovie);

router.post("/user", userController.postUser);

export default router;
