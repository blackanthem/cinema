import "./MovieDetails.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetMoviesQuery } from "../../services/api";
import Button from "../../components/Button/Button";
import ScrollRow from "../../components/ScrollRow/ScrollRow";
import CastCard from "../../components/CastCard/CastCard";
import YouTube from "../../components/YouTube/YouTube";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import { Loader } from "../../components/Loader/Loader";

export default function MovieDetails() {
  const { id: movieId } = useParams();
  const { data, isSuccess } = useGetMoviesQuery();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;
    const found = data.find((movie) => movie.id === +movieId);

    if (found === undefined) {
      navigate("/404");
      return;
    }

    setMovie(found);
    setDocumentTitle("Watch " + found.title);
  }, [isSuccess]);

  const handleClick = () => {
    navigate("buy-ticket");
  };

  if (!movie?.title) return <Loader />;

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

  const showtimes = () => {
    const times = Object.entries(movie.showTimes).map(([key, value]) => (
      <p key={key}>
        <span className="day">{key}</span>
        {value.map((time) => (
          <span className="time" key={time}>
            {time}
          </span>
        ))}
      </p>
    ));

    return times.length === 0 ? "Not Available" : times;
  };

  const canBuyTickets = typeof showtimes() !== "string";

  return (
    <div
      className="movie-details page two-columns d-sidepadding d-toppadding bg-img-dark respond"
      style={{ backgroundImage: `url(${movie.backdropPath.max})` }}
    >
      <section
        className="summary two-columns__left"
        style={{ backgroundImage: `url(${movie.posterPath.max})` }}
      >
        <div>
          {canBuyTickets && (
            <Button text="get tickets" onClick={() => handleClick()} />
          )}
        </div>
      </section>
      <section className="content two two-columns__right ">
        <div className="content__wrapper">
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
            {canBuyTickets && <Link to="buy-ticket">Buy Tickets</Link>}
          </div>
          <div className="videos">
            <h2>videos</h2>
            <ScrollRow emptyText="Not Available">{videos()}</ScrollRow>
          </div>
          <div>
            <h2>cast</h2>
            <ScrollRow emptyText="Not Available">{cast()}</ScrollRow>
          </div>
        </div>
      </section>
    </div>
  );
}
