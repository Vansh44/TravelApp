const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use((req, res, next) => {
  console.log(`>>> CORS: [${req.method}] ${req.path} from ${req.headers.origin}`);

  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    console.log(">>> CORS: Handling OPTIONS preflight, returning 200");
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`, req.headers.origin);
  next();
});

app.use("/uploads", express.static("uploads"));

const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));

app.get("/api/bookings", (req, res) => {
  console.log(">>> GET /api/bookings");
  res.json([]);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res) => {
  console.log(`>>> 404: ${req.method} ${req.path} not found`);
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res) => {
  console.error("=== ERROR CAUGHT ===");
  console.error("Error:", err.message || err);
  console.error("Stack:", err.stack);
  console.error("===================");

  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
