import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  usePostMovieMutation,
  useUpdateMovieMutation,
} from "../../services/api";
import Button from "../Button/Button";
import DatePicker from "../Inputs/DatePicker";
import SelectInput from "../Inputs/SelectInput";
import TextField from "../Inputs/TextField";
import { Showtime } from "../Showtimes/Showtimes";
import "./EditMovie.scss";
import { getKey } from "../../utils/getKey";
import {
  detailsFormat,
  postShowtimeFormat,
  updateDataFormat,
} from "./editMovieUtils";

const initialDetailsState = {
  status: "",
  ticketPrice: 0,
  startShowingDate: "",
  stopShowingDate: "",
  isFeature: false,
  showtimes: [],
};

export function EditMovie(props) {
  const { mode } = props;
  const [movie, setMovie] = useState();
  const [details, setDetails] = useState();
  const location = useLocation();
  const [postMovie, {}] = usePostMovieMutation();
  const [updateMovie, {}] = useUpdateMovieMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state) return;

    setMovie(location.state);
    setDetails(initialDetailsState);
  }, [location?.state]);

  useEffect(() => {
    if (movie)
      if (mode == "update") {
        const formatted = detailsFormat(movie);
        setDetails(formatted);
      }
  }, [movie]);

  const newShowtime = () => {
    const showtime = { id: getKey(), time: "", selectedDays: [] };
    const showtimesCopy = [...details.showtimes, showtime];

    setDetails({ ...details, showtimes: showtimesCopy });
  };

  if (!movie?.title) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDetails({ ...details, [name]: value });
  };

  const handleDayPickerChange = (day, field) => {
    handleInputChange({ target: { name: field, value: day } });
  };

  const handleCheckBoxClick = (e) => {
    const { name, checked } = e.target;
    handleInputChange({ target: { name, value: checked } });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    const data = {
      movieId: movie.id,
      ...details,
      showtimes: postShowtimeFormat(details.showtimes),
    };

    let request;

    if (mode == "update") request = updateMovie(updateDataFormat(data));
    else request = postMovie(data);

    request
      .then((res) => {
        navigate("/auth");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShowtimesChange = ({ id, time, selectedDays }) => {
    const stateShowtimeCopy = [...details.showtimes];
    let showtime = stateShowtimeCopy.find((el) => el.id === id);

    showtime.time = time ?? showtime.time;
    showtime.selectedDays = selectedDays ?? showtime.selectedDays;

    setDetails({ ...details, showtimes: stateShowtimeCopy });
  };

  const handleDeleteShowtime = (id) => {
    const showtimesCopy = details.showtimes.filter(
      (showtime) => showtime.id !== id
    );

    setDetails({ ...details, showtimes: showtimesCopy });
  };

  const showtimes = () => {
    return details.showtimes.map(({ id, time, selectedDays }) => {
      return (
        <Showtime
          key={id}
          id={id}
          onChange={(data) => handleShowtimesChange(data)}
          time={time}
          selectedDays={selectedDays}
          deleteShowtime={(id) => handleDeleteShowtime(id)}
        />
      );
    });
  };

  const statusOptions = [
    { value: "now showing" },
    { value: "coming soon" },
    { value: "none", text: "tbd" },
  ];

  return (
    <div className="edit-movie">
      <p className="edit-movie__overview">{movie.overview}</p>

      <form>
        <div className="four-squares">
          <SelectInput
            label="status"
            options={statusOptions}
            value={details.status}
            onChange={(e) => handleInputChange(e)}
          />

          <TextField
            label="ticket price"
            name="ticketPrice"
            value={details.ticketPrice}
            onChange={(e) => handleInputChange(e)}
          />

          <DatePicker
            label="start showing date"
            onDayChange={(day) =>
              handleDayPickerChange(day, "startShowingDate")
            }
            selectedDay={details.startShowingDate}
          />

          <DatePicker
            label="stop showing date"
            onDayChange={(day) => handleDayPickerChange(day, "stopShowingDate")}
            selectedDay={details.stopShowingDate}
          />
        </div>

        <div id="showtime">
          <p>Showtimes</p>
          <div id="showtime__inputs">{showtimes()}</div>

          <div id="showtime__add" onClick={() => newShowtime()}>
            add showtime
          </div>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            name="isFeature"
            id="isFeature"
            onChange={(e) => handleCheckBoxClick(e)}
            checked={details.isFeature}
          />
          <label htmlFor="isFeature" value={details.isFeature}>
            Feature Movie
          </label>
        </div>
        <div>
          <Button
            text={mode === "update" ? "update movie" : "add movie"}
            onClick={(e) => handleButtonClick(e)}
          />
        </div>
      </form>
    </div>
  );
}
