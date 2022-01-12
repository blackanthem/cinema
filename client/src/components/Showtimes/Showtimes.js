import TextField from "../Inputs/TextField";
import "./Showtimes.scss";
import { MdDelete } from "react-icons/md";

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function Showtime(props) {
  const { onChange, id, time, selectedDays, deleteShowtime } = props;

  const handleClick = (day) => {
    const selectedDaysCopy = [...selectedDays];

    const index = selectedDaysCopy.findIndex((el) => el === day);

    if (index === -1) selectedDaysCopy.push(day);
    else selectedDaysCopy.splice(index, 1);

    onChange({ id, selectedDays: selectedDaysCopy });
  };

  const handleInputChange = (e) => {
    onChange({ time: e.target.value, id });
  };

  return (
    <div className="showtime-input">
      <div className="showtime-input__textfield">
        <TextField
          label="time"
          pattern="^\d{1,2}(:\d{2})? (am|pm)$"
          invalidMsg="j"
          hint="0 am | 00:00 am"
          value={time}
          onChange={(e) => handleInputChange(e)}
          placeholder="0:00 am"
        />
      </div>

      <div className="showtime-input__days-wrapper">
        <label> Days </label>
        <div className="showtime-input__days">
          {daysOfTheWeek.map((day) => (
            <Day
              day={day}
              selected={selectedDays.includes(day)}
              key={day.substring(0, 3)}
              onClick={(day) => handleClick(day)}
            />
          ))}
        </div>
      </div>

      <div
        className="showtime-input__delete"
        onClick={() => deleteShowtime(id)}
      >
        <MdDelete />
      </div>
    </div>
  );
}

const Day = ({ day, onClick, selected }) => (
  <span
    className={`showtime-input__day ${selected}`}
    data-day={day}
    onClick={() => onClick(day)}
  >
    {day.charAt(0)}
  </span>
);
