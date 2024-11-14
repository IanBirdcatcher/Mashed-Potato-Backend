const db = require("../models");
const Resume = db.resume;
const User = db.user;
const Op = db.Sequelize.Op;
// Create and Save a new Resume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;

  }
  // Create a Resume
  const resume = {
    resumeId: req.body.resumeId,
    resumeName: req.body.resumeName,
    templateId: req.body.templateId,
    templateName: req.body.templateName,
    jobTitle: req.body.jobTitle,
    userId: req.body.userId,
  };
  // Save Resume in the database
  Resume.create(resume)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails") ) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving resumes.",
        
        });

      }
     
    });
};
// Retrieve all Resumes from the database.
exports.findAll = (req, res) => {
  const resumeId = req.query.resumeId;
  var condition = resumeId ? { resumeId: { [Op.like]: `%${resumeId}%` } } : null;
  Resume.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving resumes.",
      });
    });
};

// Find all Resumes for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Resume.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Resumes for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Resumes for user with id=" + userId,
      });
    });
};


// Find a single Resume with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Resume.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Resume with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Resume with id=" + id,
      });
    });
};

// Update a Resume by the id in the request
exports.update = (req, res) => {
  const resumeId = req.params.id;
  Resume.update(req.body, {
    where: { resumeId: resumeId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Resume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Resume with id=${resumeId}. Maybe Resume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails") ) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving resumes.",
        
        });

      }
     
    });
};
// Delete a Resume with the specified id in the request
exports.delete = (req, res) => {
  const resumeId = req.params.id;
  Resume.destroy({
    where: { resumeId: resumeId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Resume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Resume with id=${resumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Resume with id=" + resumeId,
      });
    });
};

// Delete all Resumes for a user
exports.deleteForUser = (req, res) => {
  const userId = req.params.id
  Resume.destroy({
    where: { userId: userId },
  })
    .then((nums) => {
      res.send({ message: `${nums} Resumes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all resumes for user with id: ${userId}`,
      });
    });
};
