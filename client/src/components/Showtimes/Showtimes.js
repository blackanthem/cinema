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
          pattern="^(0[1-9]|1[0-2]):[0-5][0-9] (am|pm)$"
          invalidMsg="j"
          value={time}
          onChange={(e) => handleInputChange(e)}
          placeholder="00:00 am or pm"
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
