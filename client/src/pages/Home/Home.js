import Hero from "../../components/Hero/Hero";
import { useGetMoviesQuery } from "../../services/api";
import ScrollRow from "../../components/ScrollRow/ScrollRow";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.scss";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { data, isSuccess } = useGetMoviesQuery();
  const location = useLocation();

  useEffect(() => {
    const state = location?.state?.from404;
    if (state)
      document
        .getElementById("now-showing")
        .scrollIntoView({ block: "center" });
  }, []);

  setDocumentTitle("Cinema App by Steven Yirenkyi");

  const featureMovie = () => data.find((movie) => movie.isFeature);

  const comingSoon = () =>
    data
      .filter((movie) => movie.status === "coming soon")
      .map((movie) => (
        <MovieCard movie={movie} key={movie.id} to={`/movie/${movie.id}`} />
      ));

  const nowShowing = () =>
    data
      .filter((movie) => movie.status === "now showing")
      .map((movie) => (
        <MovieCard movie={movie} key={movie.id} to={`/movie/${movie.id}`} />
      ));

  const emptyCards = () =>
    Array(4)
      .fill(null)
      .map(() => <MovieCard movie={null} key={Math.random() * 10} />);

  return (
    <div className="home page">
      <section>
        <Hero getFeatureMovie={() => featureMovie()} loaded={isSuccess} />
      </section>

      <section className="d-sidepadding" id="now-showing">
        <h2>Now showing</h2>
        {!data && <ScrollRow>{emptyCards()}</ScrollRow>}
        {data && <ScrollRow>{nowShowing()}</ScrollRow>}
      </section>

      <section className="d-sidepadding">
        <h2>coming soon</h2>
        {!data && <ScrollRow>{emptyCards()}</ScrollRow>}
        {data && <ScrollRow>{comingSoon()}</ScrollRow>}
      </section>
    </div>
  );
}
