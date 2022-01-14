import movieModel from "../models/movie.model";
import { PostMovie } from "../typings/interfaces";
import { sortDayKeys } from "../utils/sortDayKeys";
import { movieDetails } from "./tmdb.service";

export async function saveMovie({ showTimes, ...params }: PostMovie) {
  try {
    const details = await movieDetails(params.id);

    showTimes = sortDayKeys(showTimes)!;

    const data = await movieModel.create({ ...params, ...details!, showTimes });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateMovie({ id, showTimes, ...values }: PostMovie) {
  try {
    if (showTimes) {
      showTimes = sortDayKeys(showTimes)!;
      //@ts-expect-error
      values = { ...values, showTimes };
    }

    const updatedMovie = await movieModel.update(values, {
      where: { id },
      individualHooks: true,
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
