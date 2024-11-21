const db = require("../models");
const Education = db.education;
const Op = db.Sequelize.Op;

// Create and Save a new Education entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({ message: "UserId cannot be empty!" });
    return;
  }

  // Define the data object for the new Education entry
  const educationData = {
    educationId: req.body.educationId,
    school: req.body.school,
    GPA: req.body.GPA,
    major: req.body.major,
    degree: req.body.degree,
    dateRange: req.body.dateRange,
    userId: req.body.userId,
  };

  // Save the Education entry in the database
  Education.create(educationData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("userId") ? "user" : "resume";
        res.status(404).send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({ message: err.message || "Error creating the Education entry." });
      }
    });
};

// Retrieve all Education entries for a specific user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Education.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({ message: `No Education entries found for user with id=${userId}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error retrieving Education entries for user with id=${userId}.` });
    });
};

// Retrieve a single Education entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Education.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `No Education entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error retrieving Education entry with id=${id}.` });
    });
};

// Update an Education entry by ID
exports.update = (req, res) => {
  const educationId = req.params.id;
  Education.update(req.body, { where: { educationId: educationId } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Education entry was updated successfully." });
      } else {
        res.status(400).send({ message: `Could not update Education entry with id=${educationId}.` });
      }
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("userId") ? "user" : "resume";
        res.status(404).send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({ message: err.message || "Error updating the Education entry." });
      }
    });
};

// Delete an Education entry by ID
exports.delete = (req, res) => {
  const educationId = req.params.id;
  Education.destroy({ where: { educationId: educationId } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Education entry was deleted successfully!" });
      } else {
        res.status(404).send({ message: `Could not delete Education entry with id=${educationId}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error deleting Education entry with id=${educationId}.` });
    });
};
