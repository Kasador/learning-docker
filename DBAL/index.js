// Load in our Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()

// Load in our RESTful routers
const routers = require('./routers/index.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

// Home page welcome middleware
app.get('/', (req, res) => {
res
  .status(200)
  .set('Content-Type', 'text/plain')
  .send(`
    Welcome to Star Tracker Library! 🚀

    Hit the different endpoints by visiting:

    - /galaxies
    - /stars
    - /planets
  `);
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set our app to listen on port 3000
app.listen(3000)
