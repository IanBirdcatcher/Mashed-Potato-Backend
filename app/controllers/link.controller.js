const db = require("../models");
const Link = db.link;
const Op = db.Sequelize.Op;
// Create and Save a new Link
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;

  }
  // Create a Link
  const link = {
    linkId: req.body.linkId,
    linkName: req.body.linkName,
    link: req.body.link,
    userId: req.body.userId
  };
  // Save Link in the database
  Link.create(link)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`links`, CONSTRAINT `links_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving links.",
        });
      }     
    });
};
// Retrieve all Links from the database.
exports.findAll = (req, res) => {
  const linkId = req.query.linkId;
  var condition = linkId ? { linkId: { [Op.like]: `%${linkId}%` } } : null;
  Link.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving links.",
      });
    });
};

// Find all Links for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Link.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Links for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Links for user with id=" + userId,
      });
    });
};


// Find a single Link with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Link.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Link with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Link with id=" + id,
      });
    });
};

// Update a Link by the id in the request
exports.update = (req, res) => {
  const linkId = req.params.id;
  Link.update(req.body, {
    where: { linkId: linkId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Link was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Link with id=${linkId}. Maybe Link was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`links`, CONSTRAINT `links_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving links.",
        });
      }     
    });
};
// Delete a Link with the specified id in the request
exports.delete = (req, res) => {
  const linkId = req.params.id;
  Link.destroy({
    where: { linkId: linkId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Link was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Link with id=${linkId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Link with id=" + linkId,
      });
    });
};

// Delete all Links for a user
exports.deleteForUser = (req, res) => {
  const userId = req.params.id
  Link.destroy({
    where: { userId: userId },
  })
    .then((nums) => {
      res.send({ message: `${nums} Links were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all links for user with id: ${userId}`,
      });
    });
};