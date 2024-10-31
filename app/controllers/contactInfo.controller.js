const db = require("../models"); // Ensure the path is correct
const ContactInfo = db.contactInfo; // Reference to your contactInfo model

// Create a new contact info
exports.create = (req, res) => {
    // Validate request body
    if (!req.body.email || !req.body.phone) { 
        return res.status(400).send({
            message: "Content cannot be empty! Email and phone are required."
        });
    }

    // Create a new contact info instance
    const contactInfo = {
        userId: req.body.userId, // Ensure this matches the key sent in the request
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        resumeId: req.body.resumeId // Ensure this matches the key sent in the request
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

// Retrieve all contact info
exports.findAll = (req, res) => {
    // Validate that userId is provided
    if (!req.body.userId || !req.body.resumeId) {
        return res.status(400).send({
            message: "User ID and resumeId are required."
        });
    }

    ContactInfo.findAll({
        where: {
            userId: req.body.userId 
        }
    })
    .then(data => {
        res.status(200).send({
            message: "Retrieved all contact info.",
            contactInfos: data // Include an array of contact info objects
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contact info."
        });
    });
};

// Retrieve a specific contact info by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ContactInfo.findByPk(id) // Find contact info by primary key (id)
        .then(data => {
            if (data) {
                res.status(200).send({
                    message: `Retrieved contact info with id ${id}.`,
                    contactInfo: data // Include the found contact info details
                });
            } else {
                res.status(404).send({
                    message: `Contact info with id ${id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error retrieving contact info with id ${id}.`
            });
        });
};

// Delete a specific contact info by id
exports.delete = (req, res) => {
    const id = req.params.id;

    ContactInfo.destroy({
        where: { contactInfoId: id } // Use the id from the URL params
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
