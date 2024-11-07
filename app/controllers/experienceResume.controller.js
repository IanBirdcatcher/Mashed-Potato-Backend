const db = require("../models");
const ExperienceResume = db.experienceResume;
const Op = db.Sequelize.Op;
// Create and Save a new ExperienceResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.experienceId) {
    res.status(400).send({
      message: "experienceId can not be empty!",
    });
    return;
  }


  // Create a ExperienceResume
  const experienceResume = {
    experienceId: req.body.experienceId,
    resumeId: req.body.resumeId
  };
  // Save ExperienceResume in the database
  ExperienceResume.create(experienceResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`experienceresumes`, CONSTRAINT `experienceresumes_ibfk_2` FOREIGN KEY (`experienceId`) REFERENCES `experiences` (`experienceId`)")) {
        res.status(404).send({
          message:
            `The experience with an id of ${req.body.experienceId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`experienceresumes`, CONSTRAINT `experienceresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving experiences.",
        });
      }     
    });
};

// Find all ExperienceResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  ExperienceResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ExperienceResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving ExperienceResumes for user with id=" + resumeId,
      });
    });
};


// Update a ExperienceResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.experienceResumeId;
  ExperienceResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ExperienceResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update ExperienceResume with id=${experienceResumeId}. Maybe ExperienceResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`experienceResumes`, CONSTRAINT `experienceResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`experienceResumes`, CONSTRAINT `experienceResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving experienceResumes.",
        });
      }     
    });
};
// Delete a ExperienceResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.experienceResumeId;
  ExperienceResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ExperienceResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete ExperienceResume with id=${experienceResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete ExperienceResume with id=" + experienceResumeId,
      });
    });
};