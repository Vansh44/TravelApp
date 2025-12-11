import { useState, useEffect } from "react";
import TripCard from "../TripCard/TripCard";
import "./TripsSection.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

const API_BASE = "http://localhost:3000/api";

const sampleTrips = [
  {
    title: "Atlanta → Miami",
    duration: "2h 15min",
    seats: 15,
    price: 129,
    oldPrice: null,
    rating: 4.8,
    reviews: 156,
    date: "Dec 20, 2024",
    tag: "Popular",
    discount: null,
    image: image1,
  },
  {
    title: "Chicago → Los Angeles",
    duration: "5h 45min",
    seats: 8,
    price: 156,
    oldPrice: 198,
    rating: 4.7,
    reviews: 89,
    date: "Dec 18, 2024",
    discount: 21,
    image: image2,
  },
  {
    title: "New York → Boston",
    duration: "4h 30min",
    seats: 12,
    price: 48,
    oldPrice: 84,
    rating: 4.8,
    reviews: 124,
    tag: "Popular",
    discount: 25,
    date: "Dec 15, 2024",
    image: image3,
  },
];

const TripsSection = () => {
  const [dbTrips, setDbTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API_BASE}/trips`);
      if (!res.ok) {
        throw new Error(`Failed to fetch trips: ${res.status}`);
      }
      const data = await res.json();
      setDbTrips(data || []);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setDbTrips([]);
    }
  };

  const transformedDbTrips = dbTrips.map((trip) => {
    const depTime = new Date(trip.departure);
    const arrTime = new Date(trip.arrival);
    const minutes = (arrTime - depTime) / (1000 * 60);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    let discount = null;
    let oldPrice = trip.oldPrice || null;

    if (oldPrice && trip.price < oldPrice) {
      discount = Math.round(((oldPrice - trip.price) / oldPrice) * 100);
    }

    return {
      ...trip,
      title: trip.route,
      duration: `${hours}h ${mins}min`,
      seats: trip.totalSeats,
      image: trip.photo,
      date: depTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      rating: 4.8,
      reviews: 120,
      oldPrice: oldPrice,
      discount: discount,
    };
  });

  const allTrips = [...sampleTrips, ...transformedDbTrips];

  return (
    <section className="trips-section">
      <h2>Available Trips</h2>
      <p>Choose from our carefully selected destinations and enjoy a comfortable journey.</p>

      <div className="trips-grid">
        {allTrips.map((trip, index) => (
          <TripCard trip={trip} key={trip._id || `sample-${index}`} />
        ))}
      </div>
    </section>
  );
};

export default TripsSection;
