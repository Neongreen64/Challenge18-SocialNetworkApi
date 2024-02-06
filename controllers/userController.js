// Import the User and Thought models
const { user, thought } = require('../models');

// Define the userController object to contain all user-related controller functions
const userController = {
    // Retrieve all users with their friends and thoughts, sorted by username
    // getAllUsers(req, res) {
    //     user.find()
    //         .populate('friends')
    //         .populate('thoughts')
    //         .then((userData) => res.json(userData))
    //         .catch((err) => res.status(400).json(err));
    // },
    getAllUsers(req, res) {
        user.find()
            .then((userData) => res.json(userData))
            .catch((err) => res.status(400).json(err));
    },
    // Retrieve a user by their ID, including their friends and thoughts
    getUserById(req, res) {
        user.findOne(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },
    // Create a new user with the provided username and email
    createUser(req, res) {
        user.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },
    // Update a user's information by their ID with the provided username and email
    updateUser(req, res) {
        const userId = req.params.userId;
    const { username, email } = req.body;

    user.findByIdAndUpdate(userId, { username, email }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user });
      })
      .catch((err) => res.status(500).json(err));
    },
    // Delete a user by their ID, along with their associated thoughts and friends
    deleteUser(req, res) {
        const userId = req.params.userId;

        user.findByIdAndDelete(userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const deleteThoughts = thought.deleteMany({ _id: { $in: user.thoughts } });
                const deleteFriends = user.updateMany(
                    { _id: { $in: user.friends } },
                    { $pull: { friends: userId } }
                );

                return Promise.all([deleteThoughts, deleteFriends]);
            })
            .then(() => res.json({ message: 'User and associated data deleted successfully' }))
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend to a user's friends list, and add the user to the friend's friends list
    addFriend(req, res) {
        const userId = req.params.userId;
        const { friendId } = req.params;

        if (userId === friendId) {
            return res.status(400).json({ message: 'Cannot add yourself as a friend' });
        }

        user.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Add the user's ID to the friend's friends array
                return user.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } }, { new: true });
            })
            .then((friend) => res.json({ message: 'Friend added successfully', friend }))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a friend from a user's friends list, and remove the user from the friend's friends list
    deleteFriend(req, res) {
        const userId = req.params.userId;
        const { friendId } = req.params;

        user.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Remove the user's ID from the friend's friends array
                return user.findByIdAndUpdate(friendId, { $pull: { friends: userId } }, { new: true });
            })
            .then((friend) => res.json({ message: 'Friend deleted successfully', friend }))
            .catch((err) => res.status(500).json(err));
    },
};

// Export the userController object to make it available for use in other files
module.exports = userController;