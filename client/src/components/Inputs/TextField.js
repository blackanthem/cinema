import "./TextField.scss";

export default function TextField(props) {
  const { label, type = "text", children, min, value } = props;

  return (
    <div className="text-field">
      <label>{label}</label>
      {children ? children : <input type={type} min={min} value={value} />}
    </div>
  );
}
