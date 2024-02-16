// cars.js
// Mongoose model to represent a car in the database
// This file defines the structure of the data (schema) we expect for a car in our database 
// and it creates a model based on that schema. 
// The module.exports line makes the Car model available for import in other files.

const mongoose = require('mongoose');

// Schema for the car
const carSchema = new mongoose.Schema({
  model: String,
  make: String,
  color: String,
  registration: String,
  owner: String,
  address: String,
  previousOwners: [String] // Array of strings for previous owners
});

// Creating a model from the schema
module.exports = mongoose.model('Car', carSchema);
