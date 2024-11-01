const db = require("../models"); // Ensure the path is correct
const ContactInfo = db.contactInfo; // Reference to your contactInfo model

// Create a new contact info ----------------------------------
exports.create = (req, res) => {
    // Validate request body
    if (!req.body.email || !req.body.phone) { 
        return res.status(400).send({
            message: "Content cannot be empty! Email and phone are required."
        });
    }

    // Create a new contact info instance
    const contactInfo = {
        userId: req.body.userId, 
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        resumeId: req.body.resumeId 
    };

    // Save contact info in the database
    ContactInfo.create(contactInfo)
        .then(data => {
            res.status(201).send({
                message: "Contact info created successfully!",
                data: data // Return the created contact info details
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the contact info."
            });
        });
};


// Retrieve all contact info by userId-------------------------------------
exports.findAll = (req, res) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "User ID is required."
        });
    }

    ContactInfo.findAll({
        where: {
            userId: req.body.userId 
        }
    })
    .then(data => {
        res.status(200).send({
            message: "Retrieved all contact info for the user.",
            contactInfos: data 
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contact info."
        });
    });
};


// Retrieve a specific contact info by id-----------------------------
exports.findOne = (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;

    // Validate that userId is provided
    if (!userId) {
        return res.status(400).send({
            message: "User ID is required."
        });
    }

    ContactInfo.findOne({
        where: {
            id: id,
            userId: userId
        }
    })
    .then(data => {
        if (data) {
            res.status(200).send({
                message: `Retrieved contact info with id ${id} for user ${userId}.`,
                contactInfo: data 
            });
        } else {
            res.status(404).send({
                message: `Contact info with id ${id} for user ${userId} not found.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error retrieving contact info with id ${id} for user ${userId}.`
        });
    });
};

// Delete a specific contact info by id-----------------------------------
exports.delete = (req, res) => {
    const id = req.params.id;

    ContactInfo.destroy({
        where: { contactInfoId: id } 
    })
    .then(num => {
        if (num === 1) {
            res.status(204).send({
                message: `Contact info with id ${id} deleted successfully.`
            });
        } else {
            res.status(404).send({
                message: `Contact info with id ${id} not found.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error deleting contact info with id ${id}.`
        });
    });
};
// Update a specific contact info by id and userId----------------------------
exports.update = (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;

    // Validate that userId is provided
    if (!userId) {
        return res.status(400).send({
            message: "User ID is required."
        });
    }

    // Data to update
    const updatedInfo = {
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        resumeId: req.body.resumeId
    };

    ContactInfo.update(updatedInfo, {
        where: {
            id: id,
            userId: userId
        }
    })
    .then(num => {
        if (num[0] === 1) { 
            res.status(200).send({
                message: `Contact info with id ${id} for user ${userId} updated successfully.`
            });
        } else {
            res.status(404).send({
                message: `Contact info with id ${id} for user ${userId} not found or no changes made.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Error updating contact info with id ${id} for user ${userId}.`
        });
    });
};

