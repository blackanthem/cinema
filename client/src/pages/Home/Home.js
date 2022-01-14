import Hero from "../../components/Hero/Hero";
import { useGetMoviesQuery } from "../../services/api";
import ScrollRow from "../../components/ScrollRow/ScrollRow";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.scss";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

export default function Home() {
  const { data, isSuccess } = useGetMoviesQuery();

  setDocumentTitle("Cinema App by Steven Yirenkyi")

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

      <section className="d-sidepadding">
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
