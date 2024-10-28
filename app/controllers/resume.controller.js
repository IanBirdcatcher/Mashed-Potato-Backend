const db = require("../models");
const Resume = db.resume;
const Op = db.Sequelize.Op;
// Create and Save a new Resume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Resume
  const resume = {
    resumeId: req.body.resumeId,
    resumeName: req.body.resumeName,
    template: req.body.template,
    userId: req.body.userId,
  };
  // Save Resume in the database
  Resume.create(resume)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Resume.",
      });
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
  const userId = req.params.userId;
  Resume.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
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
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;
  Resume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Resumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Resumes for resume with id=" + resumeId,
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
  const id = req.params.id;
  Resume.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Resume was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Resume with id=${id}. Maybe Resume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Resume with id=" + id,
      });
    });
};
// Delete a Resume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Resume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Resume was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Resume with id=${id}. Maybe Resume was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Resume with id=" + id,
      });
    });
};
// Delete all Resumes from the database.
exports.deleteAll = (req, res) => {
  Resume.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Resumes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumes.",
      });
    });
};
