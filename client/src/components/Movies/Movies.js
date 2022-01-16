import "./Movies.scss";
import { useGetMoviesQuery } from "../../services/api";
import MovieCard from "../MovieCard/MovieCard";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import { useEffect, useState } from "react";
import { filterMovies, sortMovies } from "./moviesUtil";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Movies(props) {
  const { data, isSuccess } = useGetMoviesQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  setDocumentTitle("Movie Catalogue");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.search]);

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
          to={"/auth/edit-movie"}
          state={movie}
        />
      ))}
    </div>
  );
}
