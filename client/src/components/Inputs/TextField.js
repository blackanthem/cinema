import "./TextField.scss";

export default function TextField(props) {
  const {
    label,
    type = "text",
    children,
    min,
    max,
    value,
    name,
    onChange,
    state,
    pattern,
    invalidMsg,
    hint,
    placeholder,
  } = props;

  const input = (
    <input
      type={type}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      name={name || label}
      pattern={pattern}
      // onInvalid={invalidMsg ? () => this.setCustomValidity(invalidMsg) : null}
      placeholder={placeholder}
    />
  );

  return (
    <div className="text-field">
      <label>{label}</label>
      {children ? children : input}
      {hint && <span className="text-field__hint">{hint}</span>}
    </div>
  );
}
