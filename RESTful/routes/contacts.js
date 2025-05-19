const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.json({
        success: true,
        message: 'API is up and running - /api/v1/contacts',
        method: `Method Used: ${req.method}`
    })
});

module.exports = router;