const db = require("../models");
const ContactInfoResume = db.contactInfoResume;
const Op = db.Sequelize.Op;
// Create and Save a new ContactInfoResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.contactInfoId) {
    res.status(400).send({
      message: "contactInfoId can not be empty!",
    });
    return;
  }


  // Create a ContactInfoResume
  const contactInfoResume = {
    contactInfoId: req.body.contactInfoId,
    resumeId: req.body.resumeId
  };
  // Save ContactInfoResume in the database
  ContactInfoResume.create(contactInfoResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`contactInforesumes`, CONSTRAINT `contactInforesumes_ibfk_2` FOREIGN KEY (`contactInfoId`) REFERENCES `contactInfos` (`contactInfoId`)")) {
        res.status(404).send({
          message:
            `The contactInfo with an id of ${req.body.contactInfoId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`contactInforesumes`, CONSTRAINT `contactInforesumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contactInfos.",
        });
      }     
    });
};

// Find all ContactInfoResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  ContactInfoResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ContactInfoResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving ContactInfoResumes for user with id=" + resumeId,
      });
    });
};


// Update a ContactInfoResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.contactInfoResumeId;
  ContactInfoResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ContactInfoResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update ContactInfoResume with id=${contactInfoResumeId}. Maybe ContactInfoResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`contactInfoResumes`, CONSTRAINT `contactInfoResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`contactInfoResumes`, CONSTRAINT `contactInfoResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contactInfoResumes.",
        });
      }     
    });
};
// Delete a ContactInfoResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.contactInfoResumeId;
  ContactInfoResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ContactInfoResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete ContactInfoResume with id=${contactInfoResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete ContactInfoResume with id=" + contactInfoResumeId,
      });
    });
};