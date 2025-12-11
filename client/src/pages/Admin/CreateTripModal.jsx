import { useState } from "react";
import "./Modal.css";

const API_BASE = "http://localhost:3000/api";

const CreateTripModal = ({ close, refresh }) => {
  const [photoFile, setPhotoFile] = useState(null);

  const [form, setForm] = useState({
    route: "",
    departure: "",
    arrival: "",
    price: "",
    oldPrice: "",
    totalSeats: "",
    tripCode: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  // UPLOAD IMAGE FIRST
  const uploadPhoto = async () => {
    if (!photoFile) return null;

    const fd = new FormData();
    fd.append("photo", photoFile);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Upload failed (${res.status})`);
      }

      const data = await res.json();
      return data.imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const createTrip = async () => {
    try {
      const uploadedUrl = await uploadPhoto();
      if (!uploadedUrl) {
        alert("Please upload a trip photo.");
        return;
      }

      const bodyData = { ...form, photo: uploadedUrl };

      const res = await fetch(`${API_BASE}/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Failed to create trip (status ${res.status})`);
      }

      refresh();
      close();
    } catch (error) {
      console.error("createTrip error:", error);
      alert("Could not create trip — check console or server logs. " + (error.message || ""));
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>Create Trip</h2>

        <label className="modal-label">
          Trip Photo
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </label>

        <label className="modal-label">
          Route
          <input name="route" onChange={handleChange} />
        </label>

        <label className="modal-label">
          Departure
          <input type="datetime-local" name="departure" onChange={handleChange} />
        </label>

        <label className="modal-label">
          Arrival
          <input type="datetime-local" name="arrival" onChange={handleChange} />
        </label>

        <label className="modal-label">
          Price
          <input name="price" type="number" onChange={handleChange} />
        </label>

        <label className="modal-label">
          Old Price (Original Price)
          <input name="oldPrice" type="number" onChange={handleChange} />
        </label>

        <label className="modal-label">
          Total Seats
          <input name="totalSeats" type="number" onChange={handleChange} />
        </label>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={close}>
            Cancel
          </button>
          <button className="save-btn" onClick={createTrip}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTripModal;
