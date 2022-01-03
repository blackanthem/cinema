export default function getTrailer(videos) {
  let video = videos.find(
    (video) => video.type === "Trailer" && video.official
  )?.key;

  if (video) return video;

  video = videos.find((video) => video.type === "Trailer")?.key;

  return video;
}
