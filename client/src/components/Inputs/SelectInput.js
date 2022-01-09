import TextField from "./TextField";

export default function SelectInput(props) {
  const { label } = props;

  return (
    <TextField label={label}>
      <select>
        <option>fgg</option>
        <option>fgg</option>
        <option>fgg</option>
      </select>
    </TextField>
  );
}
