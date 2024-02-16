// CarList.js
// Component for displaying and managing a list of cars

import React, { useContext, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { CarContext } from "../context/CarContext";
import UpdateCarModal from "./UpdateCarModal"; // Make sure this path is correct

const CarList = () => {
      // Access car context for managing car data
  const { cars, setCars, updateCarsBulk } = useContext(CarContext);
    // State for managing selected car, bulk edit mode, and editable cars
  const [selectedCar, setSelectedCar] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editableCars, setEditableCars] = useState([]);
  const [isBulkEdit, setIsBulkEdit] = useState(false);

  // Function to toggle bulk edit mode
  const toggleBulkEdit = () => {
    setIsBulkEdit(!isBulkEdit);
    setEditableCars(isBulkEdit ? [] : [...cars]); // Toggle between current cars and editable state
  };

  // Handle changes in bulk edit inputs
  const handleBulkEditChange = (carIndex, key, value) => {
    const newEditableCars = editableCars.map((car, index) => {
      if (index === carIndex) {
        return { ...car, [key]: value };
      }
      return car;
    });
    setEditableCars(newEditableCars);
  };

  // Function to handle bulk update submission
  const handleBulkUpdateSubmit = () => {
    updateCarsBulk(editableCars);
    setIsBulkEdit(false); // Exit bulk edit mode
    setEditableCars([]); // Reset editable cars
  };

  // Function to handle car deletion
  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5001/cars/${carId}`);
      const updatedCars = cars.filter((car) => car._id !== carId); // Use _id if your objects use that
      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // Function to open the update modal
  const handleUpdateClick = (car) => {
    setSelectedCar(car);
    setShowUpdateModal(true);
  };

  // Function to close the update modal
  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setSelectedCar(null); // Reset selected car
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Model</th>
            <th>Make</th>
            <th>Registration Number</th>
            <th>Current Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isBulkEdit
            ? editableCars.map((car, index) => (
                <tr key={car._id || index}>
                  {/* Editable fields */}
                  <td>
                    <Form.Control
                      type="text"
                      value={car.model}
                      onChange={(e) =>
                        handleBulkEditChange(index, "model", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <Form.Control
                      type="text"
                      value={car.make}
                      onChange={(e) =>
                        handleBulkEditChange(index, "make", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={car.registration}
                      onChange={(e) =>
                        handleBulkEditChange(
                          index,
                          "registration",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={car.owner}
                      onChange={(e) =>
                        handleBulkEditChange(index, "owner", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button variant="secondary" size="sm">
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))
            : cars.map((car, index) => (
                <tr key={car._id || index}>
                  {" "}
                  {/* Ensure car._id is used as key */}
                  {/* Display only */}
                  <td>{car.model}</td>
                  <td>{car.make}</td>
                  <td>{car.registration}</td>
                  <td>{car.owner}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleUpdateClick(car)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCar(car._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <Button onClick={toggleBulkEdit}>
        {isBulkEdit ? "Cancel Bulk Edit" : "Bulk Edit"}
      </Button>
      {isBulkEdit && (
        <Button onClick={handleBulkUpdateSubmit}>Save All Changes</Button>
      )}
      {/* UpdateCarModal */}
      {selectedCar && (
        <UpdateCarModal
          show={showUpdateModal}
          handleClose={handleUpdateModalClose}
          car={selectedCar}
        />
      )}
    </>
  );
};

export default CarList;
