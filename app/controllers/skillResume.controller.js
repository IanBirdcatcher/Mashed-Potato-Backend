const db = require("../models");
const SkillResume = db.skillResume;
const Op = db.Sequelize.Op;
// Create and Save a new SkillResume
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resumeId) {
    res.status(400).send({
      message: "resumeId can not be empty!",
    });
    return;
  }
  if (!req.body.skillId) {
    res.status(400).send({
      message: "skillId can not be empty!",
    });
    return;
  }


  // Create a SkillResume
  const skillResume = {
    skillId: req.body.skillId,
    resumeId: req.body.resumeId
  };
  // Save SkillResume in the database
  SkillResume.create(skillResume)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`skillresumes`, CONSTRAINT `skillresumes_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skills` (`skillId`)")) {
        res.status(404).send({
          message:
            `The skill with an id of ${req.body.skillId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`skillresumes`, CONSTRAINT `skillresumes_ibfk_1` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving skills.",
        });
      }     
    });
};

// Find all SkillResumes for a user
exports.findByResume = (req, res) => {
  const resumeId = req.params.id;
  SkillResume.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SkillResumes for resume with id=${resumeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving SkillResumes for user with id=" + resumeId,
      });
    });
};


// Update a SkillResume by the id in the request
exports.update = (req, res) => {
  const id = req.params.skillResumeId;
  SkillResume.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SkillResume was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update SkillResume with id=${skillResumeId}. Maybe SkillResume was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`skillResumes`, CONSTRAINT `skillResumes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`skillResumes`, CONSTRAINT `skillResumes_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
        res.status(404).send({
          message:
            `The resume with an id of ${req.body.resumeId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving skillResumes.",
        });
      }     
    });
};
// Delete a SkillResume with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.skillResumeId;
  SkillResume.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SkillResume was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete SkillResume with id=${skillResumeId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete SkillResume with id=" + skillResumeId,
      });
    });
};