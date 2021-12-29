import axios from "../config/axios";
import { SearchMovie } from "../typings/tmdb.types";

export async function searchMovie(query: string) {
  try {
    const path = `/search/movie?language=en-US&query=${query}&page=1&include_adult=true`;
    const response = await axios.get(path);

    const results = <SearchMovie[]>response.data.results;

    if (!results) throw { status: 500, message: "TMDB /search/movie error" };

    return results.map((movie) => {
      const { id, title, release_date, poster_path, overview } = movie;
      return {
        id,
        title,
        overview,
        releaseDate: release_date,
        posterPath: poster_path,
      };
    });
  } catch (error) {
    throw error;
  }
}
