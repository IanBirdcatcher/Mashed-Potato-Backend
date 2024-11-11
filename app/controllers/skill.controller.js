const db = require("../models");
const Skill = db.skill;
const Op = db.Sequelize.Op;
// Create and Save a new Skill
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;

  }
  // Create a Skill
  const skill = {
    skillId: req.body.skillId,
    skill: req.body.skill,
    userId: req.body.userId,
    resumeId: req.body.resumeId
  };
  // Save Skill in the database
  Skill.create(skill)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`skills`, CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving skills.",
        });
      }     
    });
};
// Retrieve all Skills from the database.
exports.findAll = (req, res) => {
  const skillId = req.query.skillId;
  var condition = skillId ? { skillId: { [Op.like]: `%${skillId}%` } } : null;
  Skill.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skills.",
      });
    });
};

// Find all Skills for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Skill.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Skills for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Skills for user with id=" + userId,
      });
    });
};


// Find a single Skill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Skill.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Skill with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Skill with id=" + id,
      });
    });
};

// Update a Skill by the id in the request
exports.update = (req, res) => {
  const skillId = req.params.id;
  Skill.update(req.body, {
    where: { skillId: skillId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Skill was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Skill with id=${skillId}. Maybe Skill was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`skills`, CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving skills.",
        });
      }     
    });
};
// Delete a Skill with the specified id in the request
exports.delete = (req, res) => {
  const skillId = req.params.id;
  Skill.destroy({
    where: { skillId: skillId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Skill was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Skill with id=${skillId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Skill with id=" + skillId,
      });
    });
};

// Delete all Skills for a user
exports.deleteForUser = (req, res) => {
  const userId = req.params.id
  Skill.destroy({
    where: { userId: userId },
  })
    .then((nums) => {
      res.send({ message: `${nums} Skills were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all skills for user with id: ${userId}`,
      });
    });
};