import { Outlet } from "react-router-dom";
import "./Layout.scss";

export function Layout(props) {
  return (
    <div className="counter page two-columns d-sidepadding d-toppadding">
      <section className="two-columns__left">df</section>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
