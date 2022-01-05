import "./ScrollButton.scss";

export default function ScrollButton(props) {
  const { direction, onClick, hide } = props;

  const className = () => {
    let classList = "scroll-button " + direction;
    if (hide) classList += " hide";
    
    return classList;
  };

  return <button className={className()} onClick={onClick}></button>;
}
