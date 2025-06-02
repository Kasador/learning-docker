const { Galaxy, Star } = require('../models/index.js');

// Show all resources
const index = async (req, res) => { // GET ALL
  try {
    const galaxies = await Galaxy.findAll({
      include: Star // include all stars inside this galaxy
    });

    // res.status(200).json({
    //   success: true,
    //   data: galaxies,
    //   message: `All galaxies found!`
    // });
    res.render('Galaxy/index.html.twig', {
      galaxies,
      year: new Date().getFullYear(),
      author: "Hunter Steven Shaw"
    })
    console.log(galaxies)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `No galaxies found!`
    });
  }
};

// Show resource
const show = async (req, res) => { // GET by ID
  try {
     const galaxy = await Galaxy.findByPk(req.params.id, {
      include: Star // include stars linked to this galaxy
    });

     res.render('Galaxy/show.html.twig', { 
        data: galaxy,
        year: new Date().getFullYear(),
        author: "Hunter Steven Shaw"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to retrieve galaxy.`
    });
  }
};

// Create a new resource
const create = async (req, res) => { // POST
  try {
    const galaxy = await Galaxy.create(req.body); // create galaxy

    res.render('Galaxy/show.html.twig', { 
        data: galaxy,
        year: new Date().getFullYear(),
        author: "Hunter Steven Shaw"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to create galaxy.`
    });
  }
};

// Update an existing resource
const update = async (req, res) => { // PUT by ID
  try {
    const galaxy = await Galaxy.findByPk(req.params.id); // find by ID

    if (!galaxy) {
      return res.status(404).json({
        success: false,
        message: `Galaxy not found!`
      });
    }

    await galaxy.update(req.body); // update galaxy fields

    const updatedGalaxy = await Galaxy.findByPk(req.params.id, {
      include: Star
    });

    res.status(200).json({
      success: true,
      data: updatedGalaxy,
      message: `Galaxy updated successfully!`
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
    const galaxy = await Galaxy.findByPk(req.params.id); // find galaxy

    if (!galaxy) {
      return res.status(404).json({
        success: false,
        message: `Galaxy not found!`
      });
    }

    await galaxy.destroy(); // delete

    res.status(204).json(true); // no content
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete galaxy.`
    });
  }
};

const form = async (req, res) => {
    const galaxy = (typeof req.params.id !== "undefined") ? await Galaxy.findByPk(req.params.id) : new Galaxy()
    res.render('Galaxy/form.html.twig', { 
        data: galaxy,
        year: new Date().getFullYear(),
        author: "Hunter Steven Shaw"
    });
}

module.exports = { index, show, create, update, remove, form };