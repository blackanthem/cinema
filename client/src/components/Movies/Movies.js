import "./Movies.scss";
import { useGetMoviesQuery } from "../../services/api";
import MovieCard from "../MovieCard/MovieCard";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

export function Movies(props) {
  const filter = props.filter || null;
  const { data, isSuccess } = useGetMoviesQuery();

  setDocumentTitle("Movie Catalogue")

  if (!isSuccess) return null;

  return (
    <div className="movies">
      {data.map((movie) => (
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
