// index.js
// This is the entry point for the React application. It sets up the root of the application
// and renders the App component. It also includes the necessary imports for styling and performance measurement.

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles for the application
import App from "./App"; // The main App component of the application
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap for styling

// Creating the root element for React application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode is used here for highlighting potential problems in an application.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
