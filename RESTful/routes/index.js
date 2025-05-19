const express = require('expres')
const router = express.Router();
const conactsRoutes = require('./contacts');

router.use('/api/v1', conactsRoutes);

module.exports = router;