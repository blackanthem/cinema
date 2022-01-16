import "./Loader.scss";

export function Loader() {
  return (
    <div className="lds_wrapper">
      <div className="lds_ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
