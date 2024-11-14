const db = require("../models");
const Interest = db.interest;
const Op = db.Sequelize.Op;
// Create and Save a new Interest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;

  }
  // Create a Interest
  const interest = {
    interestId: req.body.interestId,
    interestName: req.body.interestName,
    interestDesc: req.body.interestDesc,
    userId: req.body.userId
  };
  // Save Interest in the database
  Interest.create(interest)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`interests`, CONSTRAINT `interests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        });
      }  else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving interests.",
        });
      }     
    });
};
// Retrieve all Interests from the database.
exports.findAll = (req, res) => {
  const interestId = req.query.interestId;
  var condition = interestId ? { interestId: { [Op.like]: `%${interestId}%` } } : null;
  Interest.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving interests.",
      });
    });
};

// Find all Interests for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Interest.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Interests for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Interests for user with id=" + userId,
      });
    });
};


// Find a single Interest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Interest.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Interest with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Interest with id=" + id,
      });
    });
};

// Update a Interest by the id in the request
exports.update = (req, res) => {
  const interestId = req.params.id;
  Interest.update(req.body, {
    where: { interestId: interestId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Interest was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Interest with id=${interestId}. Maybe Interest was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`interests`, CONSTRAINT `interests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      }  else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving interests.",
        });
      }     
    });
};
// Delete a Interest with the specified id in the request
exports.delete = (req, res) => {
  const interestId = req.params.id;
  Interest.destroy({
    where: { interestId: interestId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Interest was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Interest with id=${interestId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Interest with id=" + interestId,
      });
    });
};

// Delete all Interests for a user
exports.deleteForUser = (req, res) => {
  const userId = req.params.id
  Interest.destroy({
    where: { userId: userId },
  })
    .then((nums) => {
      res.send({ message: `${nums} Interests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all interests for user with id: ${userId}`,
      });
    });
};