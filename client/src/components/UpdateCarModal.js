// UpdateCarModal.js
// Component for updating an existing car through a modal dialog

import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // Using axios for sending data to the Express server
import { CarContext } from "../context/CarContext";

// UpdateCarModal component for updating an existing car
const UpdateCarModal = ({ show, handleClose, car }) => {
  // Access the car context to update the list of cars
  const { setCars } = useContext(CarContext);
  // State to store the updated car data
  const [updatedCar, setUpdatedCar] = useState({ ...car });

  // Handle form input changes
  const handleChange = (e) => {
    setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedCar._id) {
      console.error("Error: Car ID is undefined");
      return;
    }
    try {
      // Send the updated car data to the server using PUT request
      await axios.put(
        `http://localhost:5001/cars/${updatedCar._id}`,
        updatedCar
      );

      // Update the car list in the context with the updated car
      setCars((cars) => cars.map((c) => (c._id === updatedCar._id ? updatedCar : c)));
      handleClose();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form fields for updating car information */}
          {/* Model input */}
          <Form.Group className="mb-3" controlId="formCarModel">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter model"
              name="model"
              value={updatedCar.model}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Make input */}
          <Form.Group className="mb-3" controlId="formCarMake">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter make"
              name="make"
              value={updatedCar.make}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Registration input */}
          <Form.Group className="mb-3" controlId="formCarRegistration">
            <Form.Label>Registration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter registration"
              name="registration"
              value={updatedCar.registration}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Owner input */}
          <Form.Group className="mb-3" controlId="formCarOwner">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter owner"
              name="owner"
              value={updatedCar.owner}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Update button */}
          <Button variant="primary" type="submit">
            Update Car
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCarModal;
