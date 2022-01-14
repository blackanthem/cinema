import TextField from "./TextField";
import { getKey } from "../../utils/getKey";

export default function SelectInput(props) {
  const { label, options, onChange, value, name } = props;

  return (
    <TextField label={label}>
      <select name={name || label} onChange={onChange} value={value}>
        <option value="" disabled hidden></option>
        {options?.map((option) => {
          let { text, value } = option;
          if (typeof option === "string") value = option;

          return (
            <option value={value} key={getKey()}>
              {text || value}
            </option>
          );
        })}
      </select>
    </TextField>
  );
}
