const express = require('express');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,} = require('../../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;