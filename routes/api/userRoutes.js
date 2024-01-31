// Import the express library
const express = require('express');

// Import the controllers
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// Create a new router
const router = express.Router();

// Define the routes for getting all users and creating a new user
router.route('/').get(getAllUsers).post(createUser);

// Define the route for adding and deleting a friend for a specific user
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Define the routes for getting, updating, and deleting a specific user
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// Export the router
module.exports = router;