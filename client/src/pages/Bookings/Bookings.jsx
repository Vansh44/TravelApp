import "./Bookings.css";
import BookingCard from "../../components/BookingCard/BookingCard";

const upcomingBookings = [
  {
    id: "SLK79012",
    status: "Upcoming",
    route: "New York → Los Angeles",
    date: "2024-11-15",
    time: "08:30 AM - 01:30 PM",
    seats: "A2",
  },
  {
    id: "SLK74578",
    status: "Upcoming",
    route: "Los Angeles → San Francisco",
    date: "2024-11-21",
    time: "05:30 PM - 10:30 PM",
    seats: "C2",
  },
];

const pastBookings = [
  {
    id: "SLK12345",
    status: "Completed",
    route: "Washington D.C. → Philadelphia",
    date: "2024-10-12",
    time: "06:00 AM - 12:30 PM",
    seats: "B3",
  },
  {
    id: "SLK76564",
    status: "Completed",
    route: "Chicago → St. Louis",
    date: "2024-10-02",
    time: "02:00 PM - 10:00 PM",
    seats: "A7, B8",
  },
  {
    id: "SLK10987",
    status: "Completed",
    route: "Miami → Orlando",
    date: "2024-09-18",
    time: "09:00 AM - 12:00 PM",
    seats: "F1",
  },
];

export default function Bookings() {
  return (
    <div className="bookings-page">
      <h2>Upcoming Bookings</h2>
      <div className="upcoming-grid">
        {upcomingBookings.map((booking, idx) => (
          <BookingCard booking={booking} key={idx} />
        ))}
      </div>

      <h2>Past Bookings</h2>
      <div className="past-grid">
        {pastBookings.map((booking, idx) => (
          <BookingCard booking={booking} key={idx} />
        ))}
      </div>
    </div>
  );
}
