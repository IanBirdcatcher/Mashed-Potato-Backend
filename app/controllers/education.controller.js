const db = require("../models"); // Ensure the path is correct
const Education = db.education; // Reference to your education model

// Create a new education entry ----------------------------------
exports.create = (req, res) => {
    // Validate request body
    if (!req.body.userId ) { 
        return res.status(400).send({
            message: "Content cannot be empty! the User ID is required."
        });
    }

    // Create a new education instance
    const education = {
        userId: req.body.userId, 
        school: req.body.school,
        GPA: req.body.GPA,
        major: req.body.major,
        degree: req.body.degree,
        resumeId: req.body.resumeId 
    };

    // Save education in the database
    Education.create(education)
        .then(data => {
            res.status(201).send({
                message: "Education entry created successfully!",
                data: data // Return the created education details
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the education entry."
            });
        });
};

// Retrieve all education entries by userId-------------------------------------
exports.findAllForUser = (req, res) => {
    const userId = req.params.id; // Retrieve userId from the URL parameter

    // Ensure that userId is provided
    if (!userId) {
        return res.status(400).send({
            message: "User ID is required."
        });
    }

    // Find all education entries for the specific user
    Education.findAll({
        where: { userId: userId } // Use Education here
    })
    .then((data) => {
        res.status(200).send({
            message: "Retrieved all education entries for the user.",
            educationEntries: data 
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving education entries."
        });
    });
};

// Retrieve a specific education entry by id-----------------------------
exports.findOne = (req, res) => {
    const id = req.params.id;

    Education.findOne({
        where: {
            educationId: id, 
        }
    })
    .then(data => {
        if (data) {
            res.status(200).send({
                message: `Retrieved education entry with id ${id}.`,
                education: data 
            });
        } else {
            res.status(404).send({
                message: `Education entry with id ${id} not found`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error retrieving education entry with id ${id}.`
        });
    });
};

// Delete a specific education entry by id-----------------------------------
exports.delete = (req, res) => {
    const id = req.params.id;

    Education.destroy({
        where: { educationId: id } 
    })
    .then(num => {
        if (num === 1) {
            res.status(204).send({
                message: `Education entry with id ${id} deleted successfully.`
            });
        } else {
            res.status(404).send({
                message: `Education entry with id ${id} not found.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error deleting education entry with id ${id}.`
        });
    });
};

// Update a specific education entry by id and userId----------------------------
exports.update = (req, res) => {
    const educationId = req.params.id; 
    const userId = req.body.userId;

    // Validate userId and educationId
    if (!userId || !educationId) { 
        return res.status(400).send({
            message: "User ID and education ID are required."
        });
    }

    // Data to update
    const updatedInfo = {
        school: req.body.school,
        GPA: req.body.GPA,
        major: req.body.major,
        degree: req.body.degree,
        resumeId: req.body.resumeId // This can be optional if not required
    };

    // Use the correct primary key name in the where clause
    Education.update(updatedInfo, {
        where: {
            educationId: educationId, // Use the educationId variable
            userId: userId
        }
    })
    .then(num => {
        if (num[0] === 1) { 
            res.status(200).send({
                message: `Education entry with id ${educationId} for user ${userId} updated successfully.`
            });
        } else {
            res.status(404).send({
                message: `Education entry with id ${educationId} for user ${userId} not found or no changes made.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error updating education entry with id ${educationId} for user ${userId}.`
        });
    });
};
