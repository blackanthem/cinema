import { useState } from "react";
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

  const [error, setError] = useState(false);

  const checkValidity = (e) => {
    if (!e.target.checkValidity()) {
      setError(true);
    }
  };

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
      onBlur={checkValidity}
      onInput={() => setError(false)}
      autoComplete="false"
      autoSave="false"
    />
  );

  const className = () => {
    let classList = "text-field ";
    if (error) classList += " error";
    return classList;
  };

  return (
    <div className={className()}>
      <label>{label}</label>
      {children ? children : input}
      {hint && <span className="text-field__hint">{hint}</span>}
    </div>
  );
}
