require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sign-language_learn";
const PORT = process.env.PORT || 5000;

// Debug: Log environment variable status (don't log full URI for security)
console.log("MONGODB_URI is set:", !!process.env.MONGODB_URI);
console.log("Using MongoDB URI:", process.env.MONGODB_URI ? "Atlas (from env)" : "Localhost (fallback)");

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
