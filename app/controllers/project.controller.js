const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;
  }
  
  // Create a Project
  const project = {
    projectId: req.body.projectId,
    projectName: req.body.projectName,
    projectDesc: req.body.projectDesc,
    userId: req.body.userId,
    resumeId: req.body.resumeId
  };
  // Save Project in the database
  Project.create(project)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projects`, CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projects`, CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects.",
        });
      }     
    });
};
// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  const projectId = req.query.projectId;
  var condition = projectId ? { projectId: { [Op.like]: `%${projectId}%` } } : null;
  Project.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

// Find all Projects for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  Project.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Projects for user with id=${userId}.`,
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


// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Project with id=" + id,
      });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const projectId = req.params.id;
  Project.update(req.body, {
    where: { projectId: projectId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Project with id=${projectId}. Maybe Project was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projects`, CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projects`, CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects.",
        });
      }     
    });
};
// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const projectId = req.params.id;
  Project.destroy({
    where: { projectId: projectId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Project with id=${projectId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Project with id=" + projectId,
      });
    });
};

// Delete all Projects for a user
exports.deleteForUser = (req, res) => {
  const userId = req.params.id
  Project.destroy({
    where: { userId: userId },
  })
    .then((nums) => {
      res.send({ message: `${nums} Projects were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all projects for user with id: ${userId}`,
      });
    });
};