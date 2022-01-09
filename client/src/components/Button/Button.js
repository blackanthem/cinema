import "./Button.scss";

export default function Button(props) {
  const { text, onClick } = props;

  return (
    <button onClick={onClick} className="d-button">
      {text}
    </button>
  );
}
