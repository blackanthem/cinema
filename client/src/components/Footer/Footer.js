import "./Footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="d-sidepadding">
      <Link to="/login">employee login</Link>
    </footer>
  );
}
