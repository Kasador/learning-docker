const express = require('express')
const router = express.Router();
const contactRoutes = require('./contacts');

router.use('/contacts', contactRoutes);

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is up and running - /api/v1',
        method: `Method Used: ${req.method}`
    })
});

module.exports = router;