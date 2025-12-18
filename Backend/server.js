require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Ashish Travels API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
