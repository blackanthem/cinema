import "./MovieDetails.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMoviesQuery } from "../../services/api";
import Button from "../../components/Button/Button";
import ScrollRow from "../../components/ScrollRow/ScrollRow";
import CastCard from "../../components/CastCard/CastCard";
import YouTube from "../../components/YouTube/YouTube";

export default function MovieDetails(props) {
  const {} = props;
  const { id: movieId } = useParams();
  const { data, isSuccess } = useGetMoviesQuery();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;
    const found = data.find((movie) => movie.id === +movieId);
    // if not found display 404
    setMovie(found);
  }, [isSuccess]);

  const handleClick = () => {
    navigate("buy-ticket");
  };

  if (!movie?.title)
    return (
      <div className="movie-details  page two-columns d-sidepadding d-toppadding bg-img-dark">
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
      className="movie-details page two-columns d-sidepadding d-toppadding bg-img-dark"
      style={{ backgroundImage: `url(${movie.backdropPath.max})` }}
    >
      <section
        className="summary two-columns__left "
        style={{ backgroundImage: `url(${movie.posterPath.max})` }}
      >
        {/* <div className="summary__text">
          <h2>{movie.title}</h2>
          <p className="sub-text">{movie.genre}</p>
          <p className="runtime">{movie.runtime}</p>
        </div> */}
        <Button text="get tickets" onClick={() => handleClick()} />
      </section>
      <section className="content">
        <div className="overview">
          <h1>{movie.title}</h1>
          <p className="genre">{movie.genre} </p>
          <p className="runtime">{movie.runtime} </p>
          <h2>Storyline</h2>
          <p className="synopsis">{movie.overview}</p>
        </div>
        <div className="showtime">
          <h2>showtimes</h2>
          <div>{showtimes()}</div>
        </div>
        <div className="videos">
          <h2>videos</h2>
          <ScrollRow>{videos()}</ScrollRow>
        </div>
        <div>
          <h2>cast</h2>
          <ScrollRow>{cast()}</ScrollRow>
        </div>
      </section>
    </div>
  );
}
