import "./NavBar.scss";
import logo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const [opaque, setOpaque] = useState(false);
  const { pathname } = useLocation();

  const scrollListener = () => {
    if (window.scrollY < 150) setOpaque(false);
    else setOpaque(true);
  };

  useEffect(() => {
    // if (pathname !== "/") return setOpaque(false);

    document.addEventListener("scroll", scrollListener);

    return () => document.removeEventListener("scroll", scrollListener);
  });

  const className = () => {
    let classList = "d-sidepadding";
    if (opaque) classList += " opaque";
    return classList;
  };

  return (
    <nav className={className()}>
      <Link to="/">
        <img src={logo}></img>
      </Link>
    </nav>
  );
}
