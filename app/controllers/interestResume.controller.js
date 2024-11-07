const db = require("../models");
const InterestResume = db.interestResume;
const Op = db.Sequelize.Op;
// Create and Save a new InterestResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.interestId) {
    res.status(400).send({
      message: "interestId can not be empty!",
    });
    return;
  }


  // Create a InterestResume
  const interestResume = {
    interestId: req.body.interestId,
    resumeId: req.body.resumeId
  };
  // Save InterestResume in the database
  InterestResume.create(interestResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`interestresumes`, CONSTRAINT `interestresumes_ibfk_2` FOREIGN KEY (`interestId`) REFERENCES `interests` (`interestId`)")) {
        res.status(404).send({
          message:
            `The interest with an id of ${req.body.interestId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`interestresumes`, CONSTRAINT `interestresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving interests.",
        });
      }     
    });
};

// Find all InterestResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  InterestResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find InterestResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving InterestResumes for user with id=" + resumeId,
      });
    });
};


// Update a InterestResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.interestResumeId;
  InterestResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "InterestResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update InterestResume with id=${interestResumeId}. Maybe InterestResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`interestResumes`, CONSTRAINT `interestResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`interestResumes`, CONSTRAINT `interestResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving interestResumes.",
        });
      }     
    });
};
// Delete a InterestResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.interestResumeId;
  InterestResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "InterestResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete InterestResume with id=${interestResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete InterestResume with id=" + interestResumeId,
      });
    });
};