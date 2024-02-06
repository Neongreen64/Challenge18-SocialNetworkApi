// Importing the user and thought models
const { thought, user } = require('../models');

// Controller for getting all thoughts
const thoughtController = {
    getAllThoughts(req, res) {
        thought.find().populate('reactions')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // Controller for getting a thought by id
    getThoughtById(req, res) {
        thought.findById(req.params.id).populate('reactions')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // Controller for creating a new thought
    createThought(req, res) {
        const { thoughtText, username } = req.body;
        const userId = req.body.userId; 
    
        thought.create({ thoughtText, username, userId })
          .then((thought) => {
            // Push the thought id to the user's thoughts array and return the updated user
            return user.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } }, { new: true });
          })
          .then((user) => res.json({ message: 'Thought created successfully', user }))
          .catch((err) => res.status(500).json(err));
      },

    // Controller for updating a thought
    updateThought(req, res) {
        const thoughtId = req.params.thoughtId;
        const { thoughtText } = req.body;

        thought.findOneAndUpdate(thoughtId, { thoughtText }, { new: true })
          .then((thought) => {
            // If the thought is not found, return a 404 status
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought updated successfully', thought });
          })
          .catch((e) => res.status(500).json(e));
    },

    // Controller for deleting a thought
    deleteThought(req, res) {
        const thoughtId = req.params.thoughtId;

        thought.findOneAndUpdate(thoughtId)
        .then(thought => {
            if(!thought){
                res.status(404).json({message: 'Thought not found'});
            }
            // Pull the thought id from the user's thoughts array and return the updated user
            return user.findOneAndUpdate(thought.userId, { $pull: { thoughts: thoughtId } }, { new: true })
        }).then((user) => res.json({ message: 'Thought deleted successfully', user }))
        .catch((e) => res.status(500).json(e));
    },

    // Controller for creating a reaction to a thought
    createReaction(req, res) {
        const thoughtId = req.params.thoughtId;
        const { reactionBody, username } = req.body;

        thought.findByIdAndUpdate(thoughtId, { $push: { reactions: { reactionBody, username } } }, { new: true, runValidators: true })
        .then((thought) => {
            // If the thought is not found, return a 404 status
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Reaction created successfully', thought });
        }).catch((e) => res.status(500).json(e));
    },

    // Controller for deleting a reaction from a thought
    deleteReaction(req, res) {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;

        thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { _id: reactionId } } }, { new: true })
        .then((thought) => {
            // If the thought is not found, return a 404 status
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Reaction deleted successfully', thought });
        }).catch((e) => res.status(500).json(e));
    },
};

module.exports = thoughtController;