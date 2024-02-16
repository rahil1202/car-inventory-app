// Header.js
// This component is used for the application's navigation. It renders a navigation bar at the top of the application,

import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    // Navbar component from react-bootstrap for a consistent and responsive navigation bar.
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Car Inventory</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
