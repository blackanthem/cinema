import "./Hero.scss";
import getTrailer from "../../utils/getTrailer";
import YouTube from "../YouTube/YouTube";
import { useState } from "react";
import Button from "../Button/Button";

export default function Hero(props) {
  const { getFeatureMovie, loaded } = props;
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  if (!loaded) return <div>Heroer</div>;

  const { backdropPath, title, overview, videos, cast } = getFeatureMovie();

  const handleYtStateChange = (state) => {
    if (state === "playing") setPlaying(true);
    if (state === "ended") {
      setPlaying(false);
      // only way to get player to play again
      setPlay(false);
      setPlay(true);
      setPlay(false);
    }
    if (state === "ready") setPlayerReady(true);
  };

  const classNames = () => {
    let classList = "hero";

    if (playing) classList += " hero--playing";
    if (playerReady) classList += " hero--ready";

    return classList;
  };

  return (
    <div className={classNames()}>
      <div className="hero__video">
        <YouTube
          videoId={getTrailer(videos)}
          play={play}
          onStateChange={(state) => handleYtStateChange(state)}
        />
      </div>
      <div className="hero__img">
        <img src={backdropPath.max} alt="" />
        <div className="hero__filter"></div>
      </div>

      <div className="hero__text d-sidepadding">
        <div className="hero__text__overview">
          <h1>{title}</h1>
          <p className="sub-text">{overview}</p>
          <Button text="get tickets" />
        </div>
        <div className="hero__text__play-button">
          <button onClick={() => setPlay(!play)} className={`${play}`}>
            watch trailer
          </button>
        </div>
        <div className="hero__text__credits">
          <aside className="sub-text">
            <span className="sub-text__title"> Starring</span>
            {cast.slice(0, 5).map((actor) => (
              <span key={actor.name}>{actor.name}</span>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
