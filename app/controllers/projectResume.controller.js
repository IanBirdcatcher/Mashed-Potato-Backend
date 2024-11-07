const db = require("../models");
const ProjectResume = db.projectResume;
const Op = db.Sequelize.Op;
// Create and Save a new ProjectResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.projectId) {
    res.status(400).send({
      message: "projectId can not be empty!",
    });
    return;
  }


  // Create a ProjectResume
  const projectResume = {
    projectId: req.body.projectId,
    resumeId: req.body.resumeId
  };
  // Save ProjectResume in the database
  ProjectResume.create(projectResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projectresumes`, CONSTRAINT `projectresumes_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`)")) {
        res.status(404).send({
          message:
            `The project with an id of ${req.body.projectId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projectresumes`, CONSTRAINT `projectresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
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

// Find all ProjectResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  ProjectResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ProjectResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving ProjectResumes for user with id=" + resumeId,
      });
    });
};


// Update a ProjectResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.projectResumeId;
  ProjectResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProjectResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update ProjectResume with id=${projectResumeId}. Maybe ProjectResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projectResumes`, CONSTRAINT `projectResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`projectResumes`, CONSTRAINT `projectResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projectResumes.",
        });
      }     
    });
};
// Delete a ProjectResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.projectResumeId;
  ProjectResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProjectResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete ProjectResume with id=${projectResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete ProjectResume with id=" + projectResumeId,
      });
    });
};