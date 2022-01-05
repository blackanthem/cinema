import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesQuery } from "../../services/api";
import { getAverageColor, useWhiteText } from "../../utils/color";
import "./MovieDetails.scss";
import Button from "../../components/Button/Button";
import ScrollRow from "../../components/ScrollRow/ScrollRow";
import CastCard from "../../components/CastCard/CastCard";
import YouTube from "../../components/YouTube/YouTube";

export default function MovieDetails(props) {
  const {} = props;
  const { id: movieId } = useParams();
  const { data, isSuccess } = useGetMoviesQuery();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (!isSuccess) return;
    const found = data.find((movie) => movie.id === +movieId);
    // if not found display 404
    getAverageColor(found.posterPath.max).then((color) => {
      color = Array.from(color);

      setMovie({ ...found, color });
    });
  }, [isSuccess]);

  if (!movie?.title)
    return (
      <div className="movie-details  page two-columns d-sidepadding d-toppadding">
        <section className="summary loading two-columns__left"></section>
      </div>
    );

  const cast = () =>
    movie.cast.map((person) => (
      <CastCard
        key={person.name}
        imgSrc={person.profilePath}
        name={person.name}
        character={person.character}
      />
    ));

  const videos = () =>
    movie.videos.map(({ key }) => (
      <YouTube key={key} width={380} height={200} controls={1} videoId={key} />
    ));

  const showtimes = () =>
    Object.entries(movie.showTimes).map(([key, value]) => (
      <p key={key}>
        <span className="day">{key}</span>
        {value.map((time) => (
          <span className="time" key={time}>
            {time}
          </span>
        ))}
      </p>
    ));

  return (
    <div
      className="movie-details page two-columns d-sidepadding d-toppadding"
      style={{ backgroundImage: `url(${movie.backdropPath.max})` }}
    >
      <section className="summary two-columns__left ">
        <div className="summary__text">
          <h2>{movie.title}</h2>
          <p className="sub-text">{movie.genre}</p>
          <p className="runtime">{movie.runtime}</p>
        </div>
        <Button text="get tickets" />
      </section>
      <section className="content">
        <div>
          <h3>storyline</h3>
          <p>{movie.overview}</p>
        </div>
        <div className="showtime">
          <h3>showtimes</h3>
          <div>{showtimes()}</div>
        </div>
        <div>
          <h3>cast</h3>
          <ScrollRow>{cast()}</ScrollRow>
        </div>
        <div className="videos">
          <h3>videos</h3>
          <ScrollRow>{videos()}</ScrollRow>
        </div>
      </section>
    </div>
  );
}
