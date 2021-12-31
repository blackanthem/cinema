import type { Request as Req, Response as Res } from "express";
import { searchMovies } from "../services/tmdb.service";
import handleHttpError from "../utils/handleHttpError";
import * as movieService from "../services/movie.service";
import { movieSchema } from "../joi";

export async function getMovieSearchResults(req: Req, res: Res) {
  try {
    const query = req.query.query;
    if (typeof query !== "string" || query === "")
      throw { status: 422, message: "Invalid query" };

    const movies = await searchMovies(query);

    res.send(movies);
  } catch (error) {
    handleHttpError(res, error);
  }
}

export async function postMovie(req: Req, res: Res) {
  try {
    const data = await movieSchema.postMovie(req.body);
    const result = await movieService.saveMovie(data);

    res.send(result);
  } catch (error) {
    handleHttpError(res, error);
  }
}
