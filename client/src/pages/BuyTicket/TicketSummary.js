import Button from "../../components/Button/Button";

export function TicketSummary(props) {
  const { title, ticket, date } = props;
  const { time, numOfTickets, email, fullName } = ticket;

  return (
    <section className=" two-columns__left ticket-summary">
      <div>
        <p className="color-grey ticket-summary__header">booking summary</p>

        <h2 className="ticket-summary__title">{title}</h2>
        <TicketSummaryRow label="Date" value={date || "Select Date"} />
        <TicketSummaryRow label="time" value={time || "Select Time"} />
        <TicketSummaryRow label="screen" value="2A" />
        <hr />
        <TicketSummaryRow label="name" value={fullName || "enter name"} />
        <TicketSummaryRow
          label="email"
          value={email || "Enter Email"}
          modifier="unset"
        />
        <TicketSummaryRow label="Tickets" value={numOfTickets} />
        <hr />
      </div>
      <Button text="pay now" />
    </section>
  );
}

function TicketSummaryRow({ label, value, modifier }) {
  return (
    <div className={`ticket-summary__row ${modifier}`}>
      <span className="ticket-summary__row__label color-grey">{label}</span>
      <span className="ticket-summary__row__value">{value}</span>
    </div>
  );
}
