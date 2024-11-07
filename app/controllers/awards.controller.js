const db = require("../models");
const Award = db.award;
const Op = db.Sequelize.Op;

// Create and Save a new Award
exports.create = (req, res) => {
  // Validate request
  if (!req.body.awardName) {
    res.status(400).send({
      message: "awardName can not be empty!",
    });
    return;
  }

  // Create a Award
  const award = {
    awardId: req.body.awardId,
    awardName: req.body.awardName,
    awardDesc: req.body.awardDesc,
    userId: req.body.userId,
    resumeId: req.body.resumeId,
  };
  console.log(award);

  // Save Award in the database
  Award.create(award)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Award.",
      });
    });
};

// Find a single Award with an id
exports.findAll = (req, res) => {
  const awardId = req.query.awardId;
  var condition = awardId ? { awardId: { [Op.like]: `%${awardId}%` } } : null;
  Award.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving awards.",
      });
    });
};

// Find all Awards for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Award.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Award for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Projects for user with id=" + userId,
      });
    });
};

// Find a single Award with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Award.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Award with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Award with id=" + id,
      });
    });
};

// Update a Award by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Award.update(req.body, {
    where: { awardId : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Award was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Award with id=${id}. Maybe Award was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Award with id=" + id,
      });
    });
};
// Delete a Award with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Award.destroy({
    where: { awardId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Award was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Award with id=${id}. Maybe Award was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Award with id=" + id,
      });
    });
};
// Delete all Awards from the database.
exports.deleteAll = (req, res) => {
  Award.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Awards were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all awards.",
      });
    });
};
