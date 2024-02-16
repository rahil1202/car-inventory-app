// AddCarModal.js
// Component for adding a new car through a modal dialog

import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CarContext } from "../context/CarContext";
import axios from "axios"; // Using axious for sending the information to the Express server

// AddCarModal component for adding a new car
const AddCarModal = ({ show, handleClose }) => {
  // Access the car context to update the list of cars
  const { setCars } = useContext(CarContext);

  // State to store the form data for the new car
  const [newCar, setNewCar] = useState({
    model: "",
    make: "",
    registration: "",
    owner: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the new car data to the server using POST request
      const response = await axios.post("http://localhost:5001/cars", newCar);
      // Update the local state with the response from the server, adding the new car
      setCars((cars) => [...cars, response.data]);
      // Close the modal and reset the form fields
      handleClose();
      setNewCar({ model: "", make: "", registration: "", owner: "" }); // Reset form
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form fields for entering car information */}
          <Form.Group className="mb-3" controlId="formCarModel">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter model"
              name="model"
              value={newCar.model}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCarMake">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter make"
              name="make"
              value={newCar.make}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCarRegistration">
            <Form.Label>Registration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter registration"
              name="registration"
              value={newCar.registration}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCarOwner">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter owner details"
              name="owner"
              value={newCar.owner}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Car
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCarModal;
