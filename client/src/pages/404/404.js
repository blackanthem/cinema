import "./404.scss";
import minImg from "../../assets/images/404-w480.jpeg";
import medImg from "../../assets/images/404-w780.jpg";
import maxImg from "../../assets/images/404-w1280.jpg";
import { Link } from "react-router-dom";

export function Four0Four() {
  return (
    <div className="four0four">
      <div className="four0four__img">
        <picture>
          <source media="(max-width: 568px)" srcSet={minImg} />
          <source media="(max-width: 768px)" srcSet={medImg} />
          <img src={maxImg} alt="Taken backdrop" />
        </picture>
      </div>
      <div className="four0four__filter"></div>
      <div className="four0four__text d-sidepadding">
        <div>
          <h1>404</h1>
          <p>
            "I don't know who you are. I don't know what you want. If you're
            looking for movies, I can tell you, &nbsp;
            <Link to="/#now-showing" state={{ from404: true }}>
              we have plenty
            </Link>
            "
          </p>
        </div>
      </div>
    </div>
  );
}
