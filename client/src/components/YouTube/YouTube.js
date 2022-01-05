import { useEffect, useState } from "react";
import YouTubePlayer from "youtube-player";

export default function YouTube(props) {
  const {
    play,
    videoId,
    onStateChange = () => {},
    width = "100%",
    height = "100%",
    controls = 0,
  } = props;

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const youTubePlayer = YouTubePlayer(videoId, {
      videoId,
      width,
      height,
      controls,
    });

    youTubePlayer.on("ready", () => {
      setPlayer(youTubePlayer);
      onStateChange("ready");
    });

    youTubePlayer.on("stateChange", ({ target, data }) => {
      if (data === 0) return onStateChange("ended");
      if (data === 1) return onStateChange("playing");
      return onStateChange("");
    });
  });

  useEffect(() => {
    if (!player) return;

    if (play) player.playVideo();
    else player.pauseVideo();
  }, [play]);

  return <div id={videoId} className="yt-player"></div>;
}
