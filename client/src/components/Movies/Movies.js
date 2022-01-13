import "./Movies.scss";
import { useGetMoviesQuery } from "../../services/api";
import MovieCard from "../MovieCard/MovieCard";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import { useEffect, useState } from "react";
import { filterMovies, sortMovies } from "./moviesUtil";
import { useSearchParams } from "react-router-dom";

export function Movies(props) {
  const { data, isSuccess } = useGetMoviesQuery();
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();

  setDocumentTitle("Movie Catalogue");

  useEffect(() => {
    if (!isSuccess) return;

    const filter = searchParams.get("filter");
    const filteredData = filterMovies(data, filter);

    setMovies(sortMovies(filteredData));
  }, [isSuccess, searchParams]);

  if (!isSuccess) return null;

  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.id}
          to={"../edit-movie"}
          state={movie}
        />
      ))}
    </div>
  );
}
