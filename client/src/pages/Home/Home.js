import Hero from "../../components/Hero/Hero";
import { useGetMoviesQuery } from "../../services/api";
import ScrollRow from "../../components/ScrollRow/ScrollRow";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.scss";

export default function Home() {
  const { data, isSuccess } = useGetMoviesQuery();

  const featureMovie = () => data.find((movie) => movie.isFeature);
  const comingSoon = () =>
    data
      .filter((movie) => movie.status === "coming soon")
      .map((movie) => <MovieCard movie={movie} key={movie.id} />);
  const nowShowing = () =>
    data
      .filter((movie) => movie.status === "now showing")
      .map((movie) => <MovieCard movie={movie} key={movie.id} />);

  return (
    <div className="home page">
      <section>
        <Hero getFeatureMovie={() => featureMovie()} loaded={isSuccess} />
      </section>

      <section className="d-sidepadding">
        <h2>Now showing</h2>
        <ScrollRow>{data && nowShowing()}</ScrollRow>
      </section>

      <section className="d-sidepadding">
        <h2>coming soon</h2>
        <ScrollRow>{data && comingSoon()}</ScrollRow>
      </section>
    </div>
  );
}
