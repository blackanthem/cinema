import { Outlet } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import Textfield from "../../components/Inputs/TextField";
import { useEffect, useState } from "react";
import { useGetMoviesQuery, useSearchMoviesQuery } from "../../services/api";
import { useLocation } from "react-router-dom";
import "./Layout.scss";
import { Link } from "react-router-dom";

export function Layout(props) {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { data: searchResults } = useSearchMoviesQuery(search);
  const { movies } = useGetMoviesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      movies: data?.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      ),
    }),
  });

  useEffect(() => {
    if (search == "") setShowModal(false);
    else setShowModal(true);
  }, [search]);

  useEffect(() => {
    setActiveNav(location.search);
  }, [location]);

  const baseUrl = "/auth/movies";

  const classNames = () => {
    let classList = "nav__links";
    if (location.pathname !== baseUrl) return classList;
    if (!activeNav) return (classList += " def");
    if (activeNav.includes("coming%20soon")) return (classList += " soon");
    if (activeNav.includes("now%20showing")) return (classList += " now");
  };

  return (
    <div className=" layout page two-columns d-sidepadding d-toppadding">
      <section className="two-columns__left nav">
        <div>
          <Textfield
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <div className={classNames()}>
            <Link to={baseUrl} className="title" id="def">
              Movies
            </Link>
            <Link to={`${baseUrl}?filter=now showing`} id="now">
              now showing
            </Link>
            <Link to={`${baseUrl}?filter=coming soon`} id="soon">
              coming soon
            </Link>
          </div>
        </div>
      </section>
      <section>
        <Outlet />
        <Modal
          show={showModal}
          movies={movies}
          searchResults={searchResults}
          hide={() => setShowModal(false)}
        />
      </section>
    </div>
  );
}
