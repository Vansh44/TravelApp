import { useState } from "react";
import "./Modal.css";

const API_BASE = "http://localhost:3000/api";

const toLocalInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  return d.toISOString().slice(0, 16);
};

const EditTripModal = ({ trip, close, refresh }) => {
  const [form, setForm] = useState({
    ...trip,
    departure: toLocalInput(trip.departure),
    arrival: toLocalInput(trip.arrival),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await fetch(`${API_BASE}/trips/${trip._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      refresh();
      close();
    } catch (err) {
      console.error("Error updating trip:", err);
      alert("Failed to update trip");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2 className="modal-title">Edit Trip</h2>

        <label className="modal-label">
          Trip Code
          <input name="tripCode" value={form.tripCode || ""} onChange={handleChange} />
        </label>

        <label className="modal-label">
          Route
          <input name="route" value={form.route} onChange={handleChange} />
        </label>

        <label className="modal-label">
          Departure
          <input
            name="departure"
            type="datetime-local"
            value={form.departure}
            onChange={handleChange}
          />
        </label>

        <label className="modal-label">
          Arrival
          <input
            name="arrival"
            type="datetime-local"
            value={form.arrival}
            onChange={handleChange}
          />
        </label>

        <div className="modal-grid">
          <label className="modal-label">
            Price (USD)
            <input name="price" type="number" min="0" value={form.price} onChange={handleChange} />
          </label>

          <label className="modal-label">
            Old Price (USD)
            <input
              name="oldPrice"
              type="number"
              min="0"
              value={form.oldPrice || ""}
              onChange={handleChange}
            />
          </label>

          <label className="modal-label">
            Total Seats
            <input
              name="totalSeats"
              type="number"
              min="1"
              value={form.totalSeats}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTripModal;
