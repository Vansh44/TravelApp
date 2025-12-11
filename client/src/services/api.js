import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const fetchTrips = () => api.get("/trips");
export const updateTrip = (id, payload) => api.put(`/trips/${id}`, payload);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);

export const fetchBookings = () => api.get("/bookings");
