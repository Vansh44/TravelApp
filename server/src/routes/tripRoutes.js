const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

router.post("/", async (req, res) => {
  try {
    console.log(">>> Creating trip with data:", req.body);
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (err) {
    console.error("Error creating trip:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log(">>> Fetching all trips");
    const trips = await Trip.find();
    console.log(`>>> Found ${trips.length} trips`);
    res.json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.json(trip);
  } catch (err) {
    console.error("Error fetching trip:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(`>>> Updating trip ${req.params.id} with data:`, req.body);
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.json(trip);
  } catch (err) {
    console.error("Error updating trip:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(`>>> Deleting trip ${req.params.id}`);
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.json({ message: "Trip deleted successfully", trip });
  } catch (err) {
    console.error("Error deleting trip:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
