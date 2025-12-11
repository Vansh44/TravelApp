const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  tripCode: {
    type: String,
    default: "",
  },
  route: {
    type: String,
    required: true,
  },
  departure: {
    type: Date,
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    default: null,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  photo: {
    type: String, // URL string
    required: true,
  },
});

module.exports = mongoose.model("Trip", TripSchema);
