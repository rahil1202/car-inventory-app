// Dashboard.js
// Component for displaying the main dashboard of the car inventory application

import React, { useContext, useState } from "react";
import { CarContext } from "../context/CarContext";
import { Container, Row, Col, Button, ButtonGroup, Table } from "react-bootstrap";
import CarList from "./CarList";
import AddCarModal from "./AddCarModal";

const Dashboard = () => {
  // Access car context for managing car data and older cars
  const { cars, resetCars, olderCars, fetchOlderCars, fetchAllCars } =
    useContext(CarContext);
  // States for managing modals and visibility of older and all cars
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOlderCars, setShowOlderCars] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false); // State to control visibility of all cars

  // Function to close the "Add Car" modal
  const handleAddModalClose = () => setShowAddModal(false);
  // Function to open the "Add Car" modal
  const handleAddModalShow = () => setShowAddModal(true);

  // Function to toggle the visibility of older cars
  const handleToggleOlderCars = () => {
    if (!showOlderCars) {
      fetchOlderCars();
    }
    setShowOlderCars(!showOlderCars);
  };

  // Function to toggle the visibility of all cars
  const handleToggleAllCars = () => {
    if (!showAllCars) {
      fetchAllCars(); // Fetch and show all cars
    } else {
      resetCars(3); // Show only 3 cars
    }
    setShowAllCars(!showAllCars);
  };
  
  

  return (
    <Container fluid>
      <h2 className="mt-3">Dashboard</h2>
      <Row>
        <Col>
          <ButtonGroup className="my-3">
            <Button
              variant="primary"
              onClick={handleAddModalShow}
              className="mb-3"
            >
              Add New Car
            </Button>
            <Button
              variant="secondary"
              onClick={handleToggleOlderCars}
              className="mb-3"
            >
              {showOlderCars ? "Hide Older Cars" : "Show Older Cars"}
            </Button>
            <Button
              variant="primary"
              onClick={handleToggleAllCars}
              className="mb-3"
            >
              {showAllCars ? "Hide All Cars" : "Show All Cars"}
            </Button>
          </ButtonGroup>
          <AddCarModal show={showAddModal} handleClose={handleAddModalClose} />
          <CarList showAll={showAllCars} />
          {/* Display older cars */}
          {showOlderCars && olderCars.length > 0 && (
  <div>
    <h3>Older Cars</h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Model</th>
          <th>Make</th>
          <th>Registration</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {olderCars.map((car, index) => (
          <tr key={index}>
            <td>{car.model}</td>
            <td>{car.make}</td>
            <td>{car.registration}</td>
            <td>{car.owner}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)}

        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
