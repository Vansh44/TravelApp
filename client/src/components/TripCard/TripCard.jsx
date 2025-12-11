import "./TripCard.css";
import { FaStar, FaClock, FaUsers, FaCalendar } from "react-icons/fa";

const TripCard = ({ trip }) => {
  return (
    <div className="trip-card">
      <div className="card-badges">
        {trip.tag && <span className="badge badge-red badge-left">{trip.tag}</span>}
        {trip.discount && (
          <span className="badge badge-green badge-right">{trip.discount}% OFF</span>
        )}
      </div>

      <img src={trip.image} alt={trip.title} className="trip-img" />

      <div className="trip-content">
        <div className="reviews">
          <FaStar className="star" />
          <span>
            {trip.rating} ({trip.reviews} reviews)
          </span>
        </div>

        <h3 className="trip-title">{trip.title}</h3>

        <div className="trip-details">
          <p>
            <FaClock /> {trip.duration}
          </p>
          <p>
            <FaUsers /> {trip.seats} seats available
          </p>
          <p>
            <FaCalendar /> {trip.date}
          </p>
        </div>

        <div className="price-row">
          <span className="price-current">${trip.price}</span>
          {trip.oldPrice && <span className="price-old">${trip.oldPrice}</span>}
        </div>

        <button className="btn-book">Book Now</button>
      </div>
    </div>
  );
};

export default TripCard;
