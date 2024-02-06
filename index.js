const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/social-network-api');

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));