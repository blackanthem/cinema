import "./CastCard.scss";

export default function CastCard(props) {
  const { imgSrc, name, character } = props;

  return (
    <div className="cast-card">
      <div className="cast-card__img-wrapper">
        <img
          src={imgSrc}
          alt={`${name} as ${character}`}
          className="cast-card__img"
          loading="lazy"
        />
      </div>
      <p className="cast-card__name">{name} </p>
      <p className="cast-card__character">{character} </p>
    </div>
  );
}
