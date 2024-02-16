// carRoutes.js
// I tried out express.Router() in this app rather than defining routes directly with the .app<method>
// https://expressjs.com/en/guide/routing.html
// The routes utilize the functions created in the carsController.js and will define the endpoints the front-end can interact with

const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsControllers');

// Route to add bulk car updates
router.put('/cars/bulk-update', carsController.bulkUpdateCars);

// Route to add a new car
router.post('/cars', carsController.addCar);

// Route to get cars older than 5 years
router.get('/cars/older', carsController.listOlderCars);

// Route to get all cars
router.get('/cars', carsController.getAllCars);

// Route to get a single car by ID
router.get('/cars/:id', carsController.getCarById);

// Route to update a car's information
router.put('/cars/:id', carsController.updateCar);

// Route to delete a specific car
router.delete('/cars/:id', carsController.deleteCar);



// Export the router
module.exports = router;
