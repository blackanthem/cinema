import express from "express";
import * as movieController from "./controllers/movie.controller";

const router = express.Router();

router.get("/search-movie", movieController.getMovieSearchResults);
router.post("/movie", movieController.postMovie);

export default router;
