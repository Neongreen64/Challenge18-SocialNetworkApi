const mongoose = require('mongoose');
const { user, thought } = require('../models');

mongoose.connect('mongodb://localhost:27017/social-network-api');

