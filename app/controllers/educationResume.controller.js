const db = require("../models");
const EducationResume = db.educationResume;
const Op = db.Sequelize.Op;
// Create and Save a new EducationResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.educationId) {
    res.status(400).send({
      message: "educationId can not be empty!",
    });
    return;
  }


  // Create a EducationResume
  const educationResume = {
    educationId: req.body.educationId,
    resumeId: req.body.resumeId
  };
  // Save EducationResume in the database
  EducationResume.create(educationResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educationresumes`, CONSTRAINT `educationresumes_ibfk_2` FOREIGN KEY (`educationId`) REFERENCES `educations` (`educationId`)")) {
        res.status(404).send({
          message:
            `The education with an id of ${req.body.educationId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educationresumes`, CONSTRAINT `educationresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving educations.",
        });
      }     
    });
};

// Find all EducationResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  EducationResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find EducationResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving EducationResumes for user with id=" + resumeId,
      });
    });
};


// Update a EducationResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.educationResumeId;
  EducationResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EducationResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update EducationResume with id=${educationResumeId}. Maybe EducationResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educationResumes`, CONSTRAINT `educationResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educationResumes`, CONSTRAINT `educationResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving educationResumes.",
        });
      }     
    });
};
// Delete a EducationResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.educationResumeId;
  EducationResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EducationResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete EducationResume with id=${educationResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete EducationResume with id=" + educationResumeId,
      });
    });
};