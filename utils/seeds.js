// Import the User and Thought models
const { user, thought } = require('../models');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/social-network-api');
const userData = [
  {
    username: 'test',
    email: 'test@test.com',
  },
  {
    username: 'grant',
    email: 'grant@example.com',
  }
];

const thoughtData = [
  {
    thoughtText: 'yipeee',
    username: userData[1].username,
  },
  {
    thoughtText: 'whoa',
    username: userData[0].username,
  },
  {
    thoughtText: 'sus',
    username: userData[1].username,
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await Promise.all([
      await user.deleteMany(),
      await thought.deleteMany(),
      await user.create(userData),
      await thought.create(thoughtData)
    ]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error(err);
  }
  finally{
    mongoose.connection.close();
  }
};

// Call the seedDatabase function
seedDatabase();
