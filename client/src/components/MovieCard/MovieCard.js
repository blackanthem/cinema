import { Link } from "react-router-dom";
import "./MovieCard.scss";

export default function MovieCard(props) {
  const { movie, to, state } = props;

  if (!movie) return <a href="#" className="movie-card is-loading"></a>;

  const { posterPath, title, tagline, id } = movie;

  return (
    <Link to={to} state={state} className="movie-card">
      &nbsp;
      <div className="movie-card__img">
        <img src={posterPath.max} alt={title} aria-label={title} />
      </div>
      <div className="movie-card__gradient"></div>
      <div className="movie-card__text">
        <h2>{title}</h2>
        <p>{tagline} </p>
      </div>
    </Link>
  );
}
