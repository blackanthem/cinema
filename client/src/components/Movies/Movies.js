import "./Movies.scss";
import { useGetMoviesQuery } from "../../services/api";
import MovieCard from "../MovieCard/MovieCard";

export function Movies(props) {
  const filter = props.filter || null;
  const { data, isSuccess } = useGetMoviesQuery();

  if (!isSuccess) return <div></div>;

  return (
    <div className="movies">
      {data.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.id}
          to={"edit-movie"}
          state={movie}
        />
      ))}
    </div>
  );
}
