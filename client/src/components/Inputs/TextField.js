import "./TextField.scss";

export default function TextField(props) {
  const { label, type = "text", children, min, value, name, onChange } = props;

  const input = (
    <input
      type={type}
      min={min}
      value={value}
      onChange={onChange}
      name={name || label}
    />
  );

  return (
    <div className="text-field">
      <label>{label}</label>
      {children ? children : input}
    </div>
  );
}
