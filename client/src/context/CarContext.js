// CarContext.js
// Creates a context for car data and a provider component

import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'; // Using axious for sending the information to the Express server

// Create a context
export const CarContext = createContext();


export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://localhost:5001/cars");
                // Set only the first 3 cars
                setCars(response.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);


 // Function to reset cars to show only a limited number or all cars
const resetCars = (limit = null) => {
    if (limit) {
      // If limit is provided, show only a limited number of cars
      const limitedCars = cars.slice(0, limit);
      setCars(limitedCars);
    } else {
      // Fetch all cars from the database or API
      fetchAllCars();
    }
  };
  



  // State to store older cars
  const [olderCars, setOlderCars] = useState([]);

  // Function to fetch cars older than 5 years from the server
  const fetchOlderCars = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cars/older");
      setOlderCars(response.data);
    } catch (error) {
      console.error("Error fetching older cars:", error);
    }
  };

  // Function to handle bulk update of cars
  const updateCarsBulk = async (updatedCars) => {
    try {
      await axios.put("http://localhost:5001/cars/bulk-update", updatedCars);
      setCars(updatedCars);
    } catch (error) {
      console.error("Error updating cars:", error);
    }
  };

  // Function to fetch all cars
  const fetchAllCars = async () => {
    try {
      const response = await axios.get("http://localhost:5001/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching all cars:", error);
    }
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
        fetchAllCars,
        resetCars,
        updateCarsBulk,
        olderCars,
        fetchOlderCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
