require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://traviya-travel-site.vercel.app",
  "https://abc123.ngrok-free.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  })
);

/* -------------------- DB -------------------- */

connectDB(process.env.MONGO_URI);

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Ashish Travels API is running");
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
