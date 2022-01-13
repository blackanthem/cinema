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

export async function updateMovie(req: Req, res: Res) {
  try {
    // @ts-expect-error
    req.query.showtimes = JSON.parse(req?.query?.showtimes);
  } catch (error) {}

  try {
    console.log(req.query.showtimes);
    const data = await movieSchema.updateMovie({ ...req.query, ...req.params });
    const result = await movieService.updateMovie(data);

    res.send(result);
  } catch (error) {
    handleHttpError(res, error);
  }
}

export async function getMovies(req: Req, res: Res) {
  try {
    const movies = await movieService.getAllMovies();
    res.send(movies);
  } catch (error) {
    handleHttpError(res, error);
  }
}
