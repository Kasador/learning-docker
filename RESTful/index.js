const express = require('express');
const app = express();

app.use(express.json()); // middleware

const routes = require('./routes');
app.use('/api/v1', routes)

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is up and running - /',
        method: `Method Used: ${req.method}`
    })
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Node server running on port: ${PORT}`)
})