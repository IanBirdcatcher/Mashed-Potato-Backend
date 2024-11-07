const db = require("../models");
const AwardResume = db.awardResume;
const Op = db.Sequelize.Op;
// Create and Save a new AwardResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.awardId) {
    res.status(400).send({
      message: "awardId can not be empty!",
    });
    return;
  }


  // Create a AwardResume
  const awardResume = {
    awardId: req.body.awardId,
    resumeId: req.body.resumeId
  };
  // Save AwardResume in the database
  AwardResume.create(awardResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`awardresumes`, CONSTRAINT `awardresumes_ibfk_2` FOREIGN KEY (`awardId`) REFERENCES `awards` (`awardId`)")) {
        res.status(404).send({
          message:
            `The award with an id of ${req.body.awardId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`awardresumes`, CONSTRAINT `awardresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving awards.",
        });
      }     
    });
};

// Find all AwardResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  AwardResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AwardResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving AwardResumes for user with id=" + resumeId,
      });
    });
};


// Update a AwardResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.awardResumeId;
  AwardResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AwardResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update AwardResume with id=${awardResumeId}. Maybe AwardResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`awardResumes`, CONSTRAINT `awardResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`awardResumes`, CONSTRAINT `awardResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving awardResumes.",
        });
      }     
    });
};
// Delete a AwardResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.awardResumeId;
  AwardResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AwardResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete AwardResume with id=${awardResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete AwardResume with id=" + awardResumeId,
      });
    });
};