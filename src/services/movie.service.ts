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

export async function updateMovie({ id, ...values }: PostMovie) {
  try {
    const updatedMovie = await movieModel.update(values, {
      where: { id },
    });

    return updatedMovie;
  } catch (error) {
    throw error;
  }
}

export async function getAllMovies() {
  try {
    return await movieModel.findAll();
  } catch (error) {
    throw error;
  }
}
