const API_BASE = "http://localhost:3000/api";

export const fetchTrips = async () => {
  const res = await fetch(`${API_BASE}/trips`);
  return res.json();
};

export const deleteTrip = async (id) => {
  const res = await fetch(`${API_BASE}/trips/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const fetchBookings = async () => {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.json();
};
