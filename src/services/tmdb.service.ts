import axios from "../config/axios";
import { MovieDetails, SearchMovie } from "../typings/tmdb.types";

export async function searchMovies(query: string) {
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
    return handleError(error);
  }
}

export async function movieDetails(id: number) {
  try {
    const path = `/movie/${id}?append_to_response=credits`;
    const imageBaseUrl = "https://image.tmdb.org/t/p";
    const response = await axios.get(path);

    const movieDetails = <MovieDetails>response.data;

    const cast = movieDetails.credits.cast.map((member) => {
      const { name, profile_path, character } = member;
      return {
        name,
        profilePath: `${imageBaseUrl}/w154${profile_path}`,
        character,
      };
    });
    const backdropPath = {
      min: `${imageBaseUrl}/w300${movieDetails.backdrop_path}`,
      med: `${imageBaseUrl}/w780${movieDetails.backdrop_path}`,
      max: `${imageBaseUrl}/w1280${movieDetails.backdrop_path}`,
    };
    const posterPath = {
      min: `${imageBaseUrl}/w342${movieDetails.poster_path}`,
      max: `${imageBaseUrl}/w500${movieDetails.poster_path}`,
    };
    const runtime = (function () {
      const found = (movieDetails.runtime / 60).toString().match(/^\d+/)![0];
      if (!found) return "0h 0m";

      const hour = found[0];
      const minutes = movieDetails.runtime % 60;
      return `${hour}h ${minutes}m`;
    })();

    return {
      id: movieDetails.id,
      title: movieDetails.title,
      genre: movieDetails.genres.map((genre) => genre.name).join(" / "),
      overview: movieDetails.overview,
      cast,
      tagline: movieDetails.tagline,
      backdropPath,
      posterPath,
      releaseDate: new Date(movieDetails.release_date),
      runtime,
    };
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: any) {
  if (error.isAxiosError) {
    console.error(error);
    throw { status: error.response.status, message: error.response.data };
  }
  throw error;
}
