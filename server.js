require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

// Sync database
db.sequelize.sync();

// Configure CORS options
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.options("*", cors());

// Parse requests with JSON payloads
app.use(express.json());

// Parse requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Basic route for testing server functionality
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the resume auto-builder application." });
});

// Import routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/tutorial.routes")(app);
require("./app/routes/lesson.routes")(app);

// Set the server to listen on a specified port
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
