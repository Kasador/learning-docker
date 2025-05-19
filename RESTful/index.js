const express = require('express');
const app = express();

app.use(express.json()); // middleware

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is up and running',
    })
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Node server running on port: ${PORT}`)
})