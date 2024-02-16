// Footer.js
// This component adds a footer to the application. It is designed to display at the bottom of the application
// and includes copyright information. The footer uses a Container component for consistent styling.

import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    // Container component with a fluid layout and custom styling for the footer.
    <Container
      fluid
      style={{ backgroundColor: "#f8f9fa", marginTop: "1rem", padding: "1rem" }}
    >
      <p style={{ textAlign: "center" }}>
        © {new Date().getFullYear()} Car Inventory
      </p>
    </Container>
  );
};

export default Footer;
