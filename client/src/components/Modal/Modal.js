import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

export function Modal(props) {
  const { show, movies, searchResults, hide, fetching } = props;
  const navigate = useNavigate();

  if (!show) return <div></div>;

  const className = () => {
    let classList = "modal modal__wrapper";
    if (show) classList += " show";

    return classList;
  };

  const handleClick = ({ item, to }) => {
    hide();
    navigate(to, { state: item });
  };

  return (
    <div className={className()}>
      <div className="modal">
        <p className="modal__title">Search Movies </p>
        <section>
          <p className="title">Current Movies</p>
          <div className="modal__items">
            {movies?.length ? null : <p>No Movies</p>}
            {movies?.map((movie) => (
              <Item
                item={movie}
                key={movie.id}
                to="/auth/edit-movie"
                onClick={(data) => handleClick(data)}
              />
            ))}
          </div>
        </section>
        <section>
          <p className="title">Found Movies</p>
          {fetching ? (
            <Loader />
          ) : (
            <div className="modal__items">
              {searchResults?.length ? null : <p>No Movies</p>}
              {searchResults?.map((movie) => (
                <Item
                  item={movie}
                  key={movie.id}
                  to="/auth/add-movie"
                  onClick={(data) => handleClick(data)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const Item = ({ item, to, onClick }) => {
  return (
    <div className="modal__item">
      <div className="modal__item__img">
        <img
          src={
            typeof item.posterPath === "string"
              ? item.posterPath
              : item.posterPath.min
          }
          alt=""
        />
      </div>
      <div className="modal__item__right-div">
        <p className="modal__item__title" onClick={() => onClick({ item, to })}>
          {item.title}
        </p>
        <p className="modal__item__release-date">{item.releaseDate}</p>
        <p className="modal__item__overview">{item.overview}</p>
      </div>
    </div>
  );
};
