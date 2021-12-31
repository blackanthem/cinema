import movieModel from "../models/movie.model";
import { PostMovie } from "../typings/interfaces";
import { movieDetails } from "./tmdb.service";

export async function saveMovie(params: PostMovie) {
  try {
    const details = await movieDetails(params.id);
    const data = await movieModel.create({ ...params, ...details! });

    return data;
  } catch (error) {
    throw error;
  }
}
