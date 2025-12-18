require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://traviya-travel-site.vercel.app", // production (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Ashish Travels API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
