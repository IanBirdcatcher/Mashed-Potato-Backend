const db = require("../models");
const Experience = db.experience;
const Op = db.Sequelize.Op;
// Create and Save a new Experience
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;

  }
  // Create a Experience
  const experience = {
    experienceId: req.body.experienceId,
    jobTitle: req.body.jobTitle,
    jobDesc: req.body.jobDesc,
    dateRange: req.body.dateRange,
    userId: req.body.userId,
  };
  // Save Experience in the database
  Experience.create(experience)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`experiences`, CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving experiences.",
        });
      }     
    });
};
// Retrieve all Experiences from the database.
exports.findAll = (req, res) => {
  const experienceId = req.query.experienceId;
  var condition = experienceId ? { experienceId: { [Op.like]: `%${experienceId}%` } } : null;
  Experience.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving experiences.",
      });
    });
};

// Find all Experiences for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Experience.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Experiences for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Experiences for user with id=" + userId,
      });
    });
};


// Find a single Experience with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Experience.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Experience with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Experience with id=" + id,
      });
    });
};

// Update a Experience by the id in the request
exports.update = (req, res) => {
  const experienceId = req.params.id;
  Experience.update(req.body, {
    where: { experienceId: experienceId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Experience was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Experience with id=${experienceId}. Maybe Experience was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`experiences`, CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving experiences.",
        });
      }     
    });
};
// Delete a Experience with the specified id in the request
exports.delete = (req, res) => {
  const experienceId = req.params.id;
  Experience.destroy({
    where: { experienceId: experienceId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Experience was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Experience with id=${experienceId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Experience with id=" + experienceId,
      });
    });
};

// Delete all Experiences for a user
exports.deleteForUser = (req, res) => {
  const userId = req.params.id
  Experience.destroy({
    where: { userId: userId },
  })
    .then((nums) => {
      res.send({ message: `${nums} Experiences were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all experiences for user with id: ${userId}`,
      });
    });
};