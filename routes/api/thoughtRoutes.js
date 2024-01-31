// Import the express library
const express = require('express');

// Import the controllers
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// Create a new router
const router = express.Router();

// Define the routes for getting all thoughts and creating a new thought
router.route('/').get(getAllThoughts).post(createThought);

// Define the route for getting, updating, and deleting a specific thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// Define the routes for adding and deleting a reaction for a specific thought
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);