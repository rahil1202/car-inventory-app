// server.js
// Creating the express server

// Using dotenv for password managament
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");

// Creating an Express application
const app = express();

// Middleware to parse JSON bodies and handle CORS
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection URL
const dbUrl = process.env.dbUrl;

// Connect to MongoDB using Mongoose
mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a simple route for testing
app.get("/", (req, res) => {
  res.send("Hello from Car Inventory API!");
});

// Use the car routes
app.use(carRoutes);

// Server Port
const PORT = process.env.PORT || 5001;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
