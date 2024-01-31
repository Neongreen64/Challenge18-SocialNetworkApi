// Import the mongoose library
const mongoose = require('mongoose');

// Import the reaction schema from the Reaction file
const reactionSchema = require('./Reaction');

// Define the thought schema using mongoose
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String, // Define the type as String
        required: true, // Ensure this field is required
        maxlength: 280, // Set the maximum length to 280 characters
    },
    createdAt: {
        type: Date, // Define the type as Date
        default: Date.now, // Set the default value to the current date and time
        get: (timestamp) => dateFormat(timestamp), // Define a custom getter function to format the timestamp
    },
    username: {
        type: String, // Define the type as String
        required: true, // Ensure this field is required
    },
    reactions: [reactionSchema], // Define an array of reactions using the reaction schema
});

// Define a virtual property for the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length; // Return the length of the reactions array
});

// Create a model for the thought using the thought schema
const thought = mongoose.model('thought', thoughtSchema);

// Export the thought model
module.exports = thought;