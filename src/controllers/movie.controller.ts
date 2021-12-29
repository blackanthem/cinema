import type { Request as Req, Response as Res } from "express";
import { searchMovie } from "../services/tmdb.service";
import handleHttpError from "../utils/handleHttpError";

export async function getMovieSearchResults(req: Req, res: Res) {
  try {
    const query = req.query.query;
    if (typeof query !== "string" || query === "")
      throw { status: 422, message: "Invalid query" };

    const movies = await searchMovie(query);

    res.send(movies);
  } catch (error) {
    handleHttpError(res, error);
  }
}
