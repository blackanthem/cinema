import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import TextField from "./TextField";

export default function DatePicker(props) {
  const { label } = props;

  return (
    <TextField label={label}>
      <DayPickerInput />
    </TextField>
  );
}
