import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesQuery } from "../../services/api";
import "./BuyTicket.scss";
import TextField from "../../components/Inputs/TextField";
import SelectInput from "../../components/Inputs/SelectInput";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import {
  dateString,
  getWeekday,
  getDisabledDays,
} from "./buyTicketUtils";
import DayPicker from "react-day-picker";
import { TicketSummary } from "./TicketSummary";

export default function BuyTicket(props) {
  const { id: movieId } = useParams();
  const { data, isSuccess } = useGetMoviesQuery();
  const [movie, setMovie] = useState({});
  const [watchDate, setWatchDate] = useState();
  const [ticket, setTicket] = useState({
    time: "",
    numOfTickets: 1,
    email: "",
    fullName: "",
  });

  useEffect(() => {
    if (!isSuccess) return;
    const found = data.find((movie) => movie.id === +movieId);
    //if not found display 404
    setMovie(found);
    setDocumentTitle("Buy Tickets - " + found.title);
  }, [isSuccess]);

  if (!movie?.title)
    return (
      <div className="buy-ticket page two-columns d-sidepadding d-toppadding bg-img-dark">
        <section className="loading two-columns__left"></section>
      </div>
    );

  const handleDayPickerClick = (day, { selected, disabled }) => {
    if (disabled) return;
    if (selected) return setWatchDate(undefined);

    setWatchDate(day);
    setTicket({ ...ticket, time: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });

    setTicket({ ...ticket, [name]: value });
  };

  const watchTimes = movie.showTimes[getWeekday(watchDate)];

  return (
    <div
      className="buy-ticket page two-columns d-sidepadding d-toppadding bg-img-dark"
      style={{ backgroundImage: `url(${movie.backdropPath.max})` }}
    >
      <TicketSummary
        title={movie.title}
        ticket={ticket}
        date={dateString(watchDate)}
      />

      <section className="ticket-form">
        <h1> {"Watch " + movie.title} </h1>
        <div className="ticket-form__section">
          <h3>Ticket Details</h3>
          <DayPicker
            selectedDays={watchDate}
            onDayClick={handleDayPickerClick}
            disabledDays={getDisabledDays(movie)}
          />
          <div>
            <SelectInput
              label="time"
              options={watchTimes}
              value={ticket.time}
              onChange={(e) => handleInputChange(e)}
            />
            <TextField
              label="Number of tickets"
              name="numOfTickets"
              type="number"
              min="1"
              value={ticket.numOfTickets}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className="ticket-form__section">
          <h3>Personal Details</h3>
          <TextField
            label="full name"
            name="fullName"
            value={ticket.fullName}
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            label="email"
            type="email"
            value={ticket.email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </section>
    </div>
  );
}
