const db = require("../models");
const LinkResume = db.linkResume;
const Op = db.Sequelize.Op;
// Create and Save a new LinkResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.linkId) {
    res.status(400).send({
      message: "linkId can not be empty!",
    });
    return;
  }


  // Create a LinkResume
  const linkResume = {
    linkId: req.body.linkId,
    resumeId: req.body.resumeId
  };
  // Save LinkResume in the database
  LinkResume.create(linkResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`linkresumes`, CONSTRAINT `linkresumes_ibfk_2` FOREIGN KEY (`linkId`) REFERENCES `links` (`linkId`)")) {
        res.status(404).send({
          message:
            `The link with an id of ${req.body.linkId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`linkresumes`, CONSTRAINT `linkresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving links.",
        });
      }     
    });
};

// Find all LinkResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  LinkResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find LinkResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving LinkResumes for user with id=" + resumeId,
      });
    });
};


// Update a LinkResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.linkResumeId;
  LinkResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LinkResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update LinkResume with id=${linkResumeId}. Maybe LinkResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`linkResumes`, CONSTRAINT `linkResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`linkResumes`, CONSTRAINT `linkResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving linkResumes.",
        });
      }     
    });
};
// Delete a LinkResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.linkResumeId;
  LinkResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "LinkResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete LinkResume with id=${linkResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete LinkResume with id=" + linkResumeId,
      });
    });
};