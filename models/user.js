// Import the mongoose library
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    // Define the username field with type, required, unique, and trim properties
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // Define the email field with type, required, unique, and match properties
    email: {
        type: String,
        required: true,
        unique: true,
        // Use a regular expression to enforce a valid email format
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    // Define the thoughts field as an array of ObjectIds referencing the Thought model
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    // Define the friends field as an array of ObjectIds referencing the User model
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
});

// Create a virtual field called friendCount that calculates the length of the friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.set('toJSON', {
    virtuals:true,
    transform: function(doc,ret){
        delete ret._id;
        delete ret.__v;
    },
});

// Create a user model based on the user schema
const user = mongoose.model('user', userSchema);

// Export the user model
module.exports = user;