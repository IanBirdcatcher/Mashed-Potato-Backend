const db = require("../models");
const education = db.education;
const Op = db.Sequelize.Op;
// Create and Save a new education
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "UserId can not be empty!",
    });
    return;

  }
  // Create a education
  const education = {
    educationId: req.body.educationId,
    school: req.body.school,
    GPA: req.body.GPA,
    major: req.body.major,
    degree: req.body.degree,
    userId: req.body.userId,
    resumeId: req.body.resumeId
  };
  // Save education in the database
  education.create(education)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educations`, CONSTRAINT `educations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educations`, CONSTRAINT `educations_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
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

// Find all educations for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.id;
  education.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find educations for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving educations for user with id=" + userId,
      });
    });
};


// Find a single education with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  education.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find education with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving education with id=" + id,
      });
    });
};

// Update a education by the id in the request
exports.update = (req, res) => {
  const educationId = req.params.id;
  education.update(req.body, {
    where: { educationId: educationId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "education was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update education with id=${educationId}. Maybe education was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educations`, CONSTRAINT `educations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)")) {
        res.status(404).send({
          message:
            `The user with an id of ${req.body.userId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`resumes`.`educations`, CONSTRAINT `educations_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resumes` (`resumeId`)")) {
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
// Delete a education with the specified id in the request
exports.delete = (req, res) => {
  const educationId = req.params.id;
  education.destroy({
    where: { educationId: educationId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "education was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete education with id=${educationId}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete education with id=" + educationId,
      });
    });
};

