// carsControllers.js
// This controller will handle the CRUD operations of the application

// Import the Car model
const Car = require('../models/cars');

// Function to add a new car to the database
exports.addCar = async (req, res) => {
    try {
        // Create a new car using the Car model and req.body
        const newCar = new Car(req.body);

        // Save the car to the database
        await newCar.save();

        // Send a response back to the client
        res.status(201).json(newCar);
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message });
    }
};

// Function to get all cars from the database
exports.getAllCars = async (req, res) => {
    try {
        // Find all cars in the database
        const cars = await Car.find();

        // Send the list of cars to the client
        res.status(200).json(cars);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

// Function to update a single car's information
exports.updateCar = async (req, res) => {
    try {
        // Find a car by ID and update it with the new data from req.body
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Check if the car was found and updated
        if (!updatedCar) return res.status(404).json({ message: "Car not found" });

        // Send the updated car back to the client
        res.status(200).json(updatedCar);
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message });
    }
};

// Function to update bulks cars information
exports.bulkUpdateCars = async (req, res) => {
    try {
        const updates = req.body; // Assuming this is an array of car objects with updates

        // Loop through each update and apply them
        for (const update of updates) {
            const { id, ...updateData } = update;
            await Car.findByIdAndUpdate(id, updateData);
        }

        res.status(200).json({ message: "Cars updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to get a single car by its ID
exports.getCarById = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const carId = req.params.id;

        // Find the car by its ID in the database
        const car = await Car.findById(carId);

        // If no car is found, return a 404 (Not Found) response
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Send the found car back to the client
        res.status(200).json(car);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};


// Function to delete a specific car from the database
exports.deleteCar = async (req, res) => {
    try {
        // Attempt to delete the car using its ID (provided in the request parameters)
        const car = await Car.findByIdAndDelete(req.params.id);

        // If no car is found with that ID, return a 404 (Not Found) response
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
// Send a confirmation response that the car has been deleted
res.status(200).json({ message: "Car deleted successfully" });
} catch (error) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ message: error.message });
}
};

// Function to list cars older than 5 years with specific details
exports.listOlderCars = async (req, res) => {
    try {
        // Calculate the cutoff year (current year - 5)
        const currentYear = new Date().getFullYear();
        const cutoffYear = currentYear - 5;

        // Find cars with a model year less than or equal to the cutoff year
        // and select only specific fields (model, make, registration, owner)
        const olderCars = await Car.find({ model: { $lte: cutoffYear.toString() } }, 
                                          'model make registration owner');

        // Send the list of older cars back to the client
        res.status(200).json(olderCars);
    } catch (error) {
        // If an error occurs, send a 500 (Internal Server Error) response with the error message
        res.status(500).json({ message: error.message });
    }
};

