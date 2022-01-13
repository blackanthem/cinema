import { Outlet } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import Textfield from "../../components/Inputs/TextField";
import { useEffect, useState } from "react";
import { useGetMoviesQuery, useSearchMoviesQuery } from "../../services/api";

export function Layout(props) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { movies } = useGetMoviesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      movies: data?.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      ),
    }),
  });
  const { data: searchResults } = useSearchMoviesQuery(search);

  useEffect(() => {
    if (search == "") setShowModal(false);
    else setShowModal(true);
  }, [search]);

  return (
    <div className=" layout page two-columns d-sidepadding d-toppadding">
      <section className="two-columns__left">
        <Textfield
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
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
