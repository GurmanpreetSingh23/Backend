const express = require("express");
const app = express();
const path = require("path");

const connectDB = require("./databaseConn/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

// ❌ REMOVE cors completely
// const cors = require("cors");

// Custom modules
const userRoutes = require("./routes/userRoutes");
const indexRoutes = require("./routes/indexRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes (API first)
app.use("/", indexRoutes);
app.use("/device-compare/user", userRoutes);
app.use("/device-compare/admin", adminRoutes);
app.use("/device-compare/devices", deviceRoutes);

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection error:", err));