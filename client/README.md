# Car Inventory Management App

This project is a Car Inventory Management application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows you to manage and track information about cars, including their model, make, registration, and owner details.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation

1. **Clone the repository to your local machine:**
   ```
   git clone <https://github.com/Brentyn-Delport/car-inventory-app.git>
   ```
2. **Change into the project directory:**
   ```
   cd car-inventory-app
   ```
3. **Install the server dependencies:**
   ```
   cd server
   npm install
   ```
4. **Install the client dependencies:**
   ```
   cd client
   npm install
   ```

### Configuration

1. **Configure the server:**

   Create a `.env` file in the server directory and set the following environment variables:
   ```
   PORT=5001  # The port on which the server will run
   MONGODB_URI=<your-mongodb-uri>  # MongoDB connection URI
   ```
2. **Start the server:**
   ```
   cd server
   npm start
   ```
3. **Start the client:**
   ```
   cd client
   npm start
   ```
4. Open your web browser and go to `http://localhost:3000` to access the Car Inventory Management App.

## Usage

- **Add New Car:** Click the "Add New Car" button to add a new car to the inventory. Fill in the details and click "Add Car."

- **Show Older Cars:** Click the "Show Older Cars" button to display cars older than 5 years in a table format.

- **Show All Cars:** Click the "Show All Cars" button to display all cars in the inventory.

- **Edit Car:** Click the "Edit" button next to a car to edit its details.

- **Bulk Edit Cars:** Click the "Bulk Edit" button next to edit details for all the cars. I recommend you click "Show All Cars" button before attempting to bulk edit.

- **Delete Car:** Click the "Delete" button next to a car to remove it from the inventory.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

This project was bootstrapped with Create React App.
