import { useEffect, useState } from "react";
import "./Admin.css";
import TripTable from "./TripTable";
import BookingTable from "./BookingTable";
import CreateTripModal from "./CreateTripModal";
import EditTripModal from "./EditTripModal";
import { FaQrcode, FaMapPin, FaClock, FaBook } from "react-icons/fa";

const API_BASE = "http://localhost:3000/api";

const Admin = () => {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTrip, setEditTrip] = useState(null);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchTrips = async () => {
    try {
      setLoadingTrips(true);
      console.log("Fetching trips from:", `${API_BASE}/trips`);
      const res = await fetch(`${API_BASE}/trips`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched trips:", data);
      setTrips(data || []);
    } catch (err) {
      console.error("Error fetching trips:", err);
      alert("Failed to fetch trips: " + err.message);
    } finally {
      setLoadingTrips(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      console.log("Fetching bookings from:", `${API_BASE}/bookings`);
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Bookings response status:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched bookings:", data);
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to fetch bookings: " + err.message);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchTrips();
    fetchBookings();
  }, []);

  const totalTrips = trips.length;
  const totalBookings = bookings.length;
  const upcomingDepartures = trips.filter((t) => {
    if (!t.departure) return false;
    const dep = new Date(t.departure);
    return dep > new Date();
  }).length;

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Admin Overview</p>
          </div>
        </header>

        <section className="overview-section">
          <div className="overview-card overview-blue">
            <div className="overview-icon">
              <FaMapPin />
            </div>
            <div>
              <p className="overview-label">Total Trips</p>
              <p className="overview-value">{totalTrips}</p>
            </div>
          </div>

          <div className="overview-card overview-green">
            <div className="overview-icon">
              <FaBook />
            </div>
            <div>
              <p className="overview-label">Total Bookings</p>
              <p className="overview-value">{totalBookings}</p>
            </div>
          </div>

          <div className="overview-card overview-yellow">
            <div className="overview-icon">
              <FaClock />
            </div>
            <div>
              <p className="overview-label">Upcoming Departures</p>
              <p className="overview-value">{upcomingDepartures}</p>
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <div>
              <h3 className="section-title">Trip Management</h3>
            </div>

            <div className="section-actions">
              <button type="button" className="btn btn-primary" onClick={fetchTrips}>
                All Trips
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                + Add New Trip
              </button>
            </div>
          </div>

          {loadingTrips ? (
            <div className="loading-text">Loading trips...</div>
          ) : (
            <TripTable trips={trips} refresh={fetchTrips} onEdit={(trip) => setEditTrip(trip)} />
          )}
        </section>

        <section className="section-block">
          <div className="section-header">
            <div>
              <h3 className="section-title">Booking Management</h3>
            </div>

            <div className="section-actions">
              <button type="button" className="btn btn-outline" onClick={fetchBookings}>
                All Bookings
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => alert("QR verification flow coming soon")}
              >
                <FaQrcode /> Verify QR
              </button>
            </div>
          </div>

          {loadingBookings ? (
            <div className="loading-text">Loading bookings...</div>
          ) : (
            <BookingTable bookings={bookings} />
          )}
        </section>
      </div>

      {showCreateModal && (
        <CreateTripModal close={() => setShowCreateModal(false)} refresh={fetchTrips} />
      )}

      {editTrip && (
        <EditTripModal trip={editTrip} close={() => setEditTrip(null)} refresh={fetchTrips} />
      )}
    </div>
  );
};

export default Admin;
