const express = require ('express');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;