const { Planet, Star } = require("../models/index.js");

// Show all resources
const index = async (req, res) => { // GET ALL
  try {
    const planets = await Planet.findAll({
      include: {
        model: Star,
        through: { 
          attributes: [] // hide join table data
        }
      }
    });

    // res.status(200).json({
    //   success: true,
    //   data: planets,
    //   message: `All planets found!`
    // });

    res.render('Planet/index.html.twig', {
      planets,
      year: new Date().getFullYear(),
      author: "Hunter Steven Shaw"
    })
    console.log(planets)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `No planets found!`
    });
  }
};

// Show resource
const show = async (req, res) => { // GET by ID
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: {
        model: Star,
        through: { 
          attributes: [] // hide join table data
        }
      }
    });

    res.render('Planet/show.html.twig', { 
        data: planet,
        year: new Date().getFullYear(),
        author: "Hunter Steven Shaw"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to retrieve planet.`
    });
  }
};

// Create a new resource
const create = async (req, res) => { // POST 
  try {
    const planet = await Planet.create(req.body);

    const allStars = await Star.findAll(); // get all the stars 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const shuffled = allStars.sort(() => 0.5 - Math.random()); // randomize the stars 
    const selectedStars = shuffled.slice(0, Math.floor(Math.random() * 4) + 1); // make new array, 0 index to start, and random number from 1-4 to end to make new array.

    await planet.addStars(selectedStars);

    // res.status(201).json({
    //   success: true,
    //   data: planet,
    //   message: `Created a new planet and linked to ${selectedStars.length} star(s)!`
    // });
     res.render('Planet/show.html.twig', { 
        data: planet,
        year: new Date().getFullYear(),
        author: "Hunter Steven Shaw"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to create planet: ${error.message}`
    });
  }
};

// Update an existing resource
const update = async (req, res) => { // PUT (Update) BY ID
  try {
    const planet = await Planet.findByPk(req.params.id); // find id - primary key

    if (!planet) {
      return res.status(404).json({
        success: false,
        message: `Planet not found!`
      });
    }

    await planet.update(req.body); // update with the request body

    res.status(200).json({
      success: true,
      data: planet,
      message: `Planet updated successfully!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Update failed.`
    });
  }
};

// Remove a single resource
const remove = async (req, res) => { // DELETE by ID
  try {
    const planet = await Planet.findByPk(req.params.id); // primary key

    if (!planet) { // if no planet found, 404
      return res.status(404).json({
        success: false,
        message: `Planet not found!`
      });
    }

    await planet.destroy(); // delete

    res.status(204).json(true); // 204 - it did what it needed to do, but nothing to return. 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete planet.`
    });
  }
};

const form = async (req, res) => {
    const planet = (typeof req.params.id !== "undefined") ? await Planet.findByPk(req.params.id) : new Planet()
    res.render('Planet/form.html.twig', { 
        data: planet,
        year: new Date().getFullYear(),
        author: "Hunter Steven Shaw"
    });
}

module.exports = { index, show, create, update, remove, form, };