import TextField from "./TextField";

export default function SelectInput(props) {
  const { label, options, onChange, value, name } = props;

  return (
    <TextField label={label}>
      <select name={name || label} onChange={onChange} value={value}>
        <option value="" disabled hidden></option>
        {options.map(({ text, value }) => (
          <option value={value} key={value.charAt(0)}>
            {text || value}
          </option>
        ))}
      </select>
    </TextField>
  );
}
