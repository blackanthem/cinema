import "./NavBar.scss";
import logo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [opaque, setOpaque] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY < 200) setOpaque(false);
      else setOpaque(true);
    });
  });

  const className = () => {
    let classList = "d-sidepadding";
    if (opaque) classList += " opaque";
    return classList;
  };

  return (
    <nav className={className()}>
      <img src={logo}></img>
    </nav>
  );
}
