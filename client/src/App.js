// App.js
// Main component that serves as the entry point of the car inventory application

import React from "react";
import { CarProvider } from "./context/CarContext"; // Import the CarProvider for managing car data
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import Header from "./components/Header"; // Import the Header component
import Footer from "./components/Footer"; // Import the Footer component
import "./App.css";

function App() {
  return (
    <CarProvider>
      {/* Include the Header component at the top */}
      <Header />
      <main>
        {/* Include the Dashboard component for the main content */}
        <Dashboard />
      </main>
      {/* Include the Footer component at the bottom */}
      <Footer />
    </CarProvider>
  );
}

export default App;
