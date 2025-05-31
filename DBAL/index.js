// Load in our Express framework
const express       = require(`express`)

const twig = require('twig');

// Create a new Express instance called "app"
const app           = express()

// Load in our RESTful routers
const routers = require('./routers/index.js')
const bodyParser = require('body-parser')

app.set("twig options", {
  allowAsync: true,
  strict_variables: false
})

app.set('view engine', 'twig');
app.set('views', './templates');

app.use(bodyParser.urlencoded({ extended: false }));

// Home page welcome middleware
app.get('/', (req, res) => {
// res
//   .status(200)
//   .set('Content-Type', 'text/plain')
//   .send(`
//     Welcome to Star Tracker Library! 🚀

//     Hit the different endpoints by visiting:

//     - /galaxies
//     - /stars
//     - /planets
//   `);

  res.render('home.html.twig');
})

// Register our RESTful routers with our "app"
app.use(`/planets`,  routers.planet)
app.use(`/stars`,    routers.star)
app.use(`/galaxies`, routers.galaxy)

// Set our app to listen on port 3000
app.listen(3000)
