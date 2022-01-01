import "./ScrollRow.scss";
import MovieCard from "../MovieCard/MovieCard";
import ScrollButton from "./ScrollButton";
import { createRef } from "react";
// import scrollReachEnds from "../../utils/scrollReachEnds";

export default function ScrollRow(props) {
  const { movies } = props;

  if (!movies) return <div>no movie man</div>;

  const ref = createRef();

  async function handleClick(direction) {
    const scrollRow = ref.current;
    const left = direction === "left" ? -700 : 700;

    scrollRow.scrollBy({ left });
  }

  return (
    <div className="scroll-row ">
      <ScrollButton direction="left" onClick={() => handleClick("left")} />
      <div className="scroll-row__wrapper" ref={ref}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <ScrollButton direction="right" onClick={() => handleClick("right")} />
    </div>
  );
}
