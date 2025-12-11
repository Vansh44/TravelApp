import "./BookingCard.css";
import { FaPlane, FaCalendar, FaClock, FaBus, FaRoute } from "react-icons/fa";

const BookingCard = ({ booking }) => {
  const cardClass =
    booking.status === "Upcoming" ? "booking-card upcoming-card" : "booking-card past-card";

  return (
    <div className={cardClass}>
      <div className="booking-header">
        <p className="booking-id">
          Booking ID: {booking.id}
          {booking.status === "Upcoming" ? (
            <FaPlane className="booking-id-icon upcoming" />
          ) : (
            <FaBus className="booking-id-icon past" />
          )}
        </p>
        <span className={`badge ${booking.status === "Upcoming" ? "badge-blue" : "badge-green"}`}>
          {booking.status}
        </span>
      </div>

      <div className="booking-route">
        <FaRoute className="icon2" />
        <p>{booking.route}</p>
      </div>

      <div className="booking-details">
        <p>
          <FaCalendar className="icon2" /> {booking.date}
        </p>
        <p>
          <FaClock className="icon2" /> {booking.time}
        </p>
        <p> Seats: {booking.seats}</p>
      </div>

      {booking.status === "Upcoming" ? (
        <div className="booking-action upcoming-action">
          <FaPlane className="icon" />
        </div>
      ) : (
        <div className="booking-action past-action">
          <FaBus />
        </div>
      )}
    </div>
  );
};

export default BookingCard;
