import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMoviesQuery } from "../../services/api";
import "./BuyTicket.scss";
import Button from "../../components/Button/Button";
import TextField from "../../components/Inputs/TextField";
import DatePicker from "../../components/Inputs/DatePicker";
import SelectInput from "../../components/Inputs/SelectInput";

export default function BuyTicket(props) {
  const { id: movieId } = useParams();
  const { data, isSuccess } = useGetMoviesQuery();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (!isSuccess) return;
    const found = data.find((movie) => movie.id === +movieId);
    //if not found display 404
    setMovie(found);
  }, [isSuccess]);

  if (!movie?.title)
    return (
      <div className="buy-ticket page two-columns d-sidepadding d-toppadding bg-img-dark">
        <section className="loading two-columns__left"></section>
      </div>
    );

  return (
    <div
      className="buy-ticket page two-columns d-sidepadding d-toppadding bg-img-dark"
      style={{ backgroundImage: `url(${movie.backdropPath.max})` }}
    >
      <section className=" two-columns__left ticket-summary">
        <div>
          <p className="color-grey ticket-summary__header">booking summary</p>

          <h2 className="ticket-summary__title">{movie.title}</h2>
          <TicketSummaryRow label="Date" value="Monday 22nd Febuary, 2021" />
          <TicketSummaryRow label="time" value="10 AM - 3 PM" />
          <TicketSummaryRow label="screen" value="2A" />
          <hr />
          <TicketSummaryRow label="name" value="daniel zor" />
          <TicketSummaryRow label="email" value="danielzor@gmail.com" />
          <TicketSummaryRow label="Tickets" value="2" />
          <hr />
        </div>
        <Button text="pay now" />
      </section>
      <section className="ticket-form">
        <div className="ticket-form__section">
          <h3>Ticket Details</h3>
          <div className="ticket-form__row">
            <DatePicker label="Date" />
            <SelectInput label="time" />
          </div>
          <TextField label="Number of tickets" type="number" min="1" />
        </div>
        <div className="ticket-form__section">
          <h3>Personal Details</h3>
          <div className="ticket-form__row">
            <TextField label="full name" />
            <TextField label="email" type="email" />
          </div>
        </div>
      </section>
    </div>
  );
}

const HorizontalLine = () => (
  <svg
    width="300"
    height="1"
    viewBox="0 0 300 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="hr"
  >
    <line
      x1="0.5"
      y1="0.5"
      x2="299.5"
      y2="0.5"
      // stroke="#2B2B30"
      strokeLinecap="round"
      strokeDasharray="10 10"
    />
  </svg>
);

const TicketSummaryRow = ({ label, value }) => (
  <div className="ticket-summary__row">
    <span className="ticket-summary__row__label color-grey">{label}</span>
    <span className="ticket-summary__row__value">{value}</span>
  </div>
);
