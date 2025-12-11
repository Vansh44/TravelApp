import { FaEdit, FaTrash } from "react-icons/fa";
import "./Admin.css";

const formatTime = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const TripTable = ({ trips, refresh, onEdit }) => {
  const deleteTrip = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await fetch(`http://localhost:3000/api/trips/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (err) {
      console.error("Error deleting trip:", err);
      alert("Failed to delete trip. Please try again.");
    }
  };

  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Total Seats</th>
            <th className="th-actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {trips.length === 0 ? (
            <tr>
              <td colSpan={7} className="empty-row">
                No trips found. Create a new trip to get started.
              </td>
            </tr>
          ) : (
            trips.map((t, index) => (
              <tr key={t._id || index}>
                <td>{t.tripCode || `T${String(index + 1).padStart(3, "0")}`}</td>
                <td>{t.route}</td>
                <td>{formatTime(t.departure)}</td>
                <td>{formatTime(t.arrival)}</td>
                <td>${t.price}</td>
                <td>{t.totalSeats}</td>

                <td className="actions-cell">
                  <button type="button" className="icon-btn edit-btn" onClick={() => onEdit(t)}>
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="icon-btn delete-btn"
                    onClick={() => deleteTrip(t._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TripTable;
