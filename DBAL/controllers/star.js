const { Star, Planet, Galaxy } = require("../models/index.js");

// Show all resources
const index = async (req, res) => { // GET ALL
  try {
    const stars = await Star.findAll({
      include: [
        {
          model: Planet,
          through: { attributes: [] } // hide join table data
        },
        Galaxy // include galaxy this star belongs to
      ]
    });

    res.status(200).json({
      success: true,
      data: stars,
      message: `All stars found!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `No stars found!`
    });
  }
};

// Show single resource
const show = async (req, res) => { // GET by ID
  try {
    const star = await Star.findByPk(req.params.id, {
      include: [
        {
          model: Planet,
          through: { attributes: [] } // hide join table data
        },
        Galaxy // include linked galaxy
      ]
    });

    if (!star) {
      return res.status(404).json({
        success: false,
        message: `Star not found!`
      });
    }

    res.status(200).json({
      success: true,
      data: star,
      message: `Star found!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to retrieve star.`
    });
  }
};

// Create a new resource
const create = async (req, res) => { // POST
  try {
    const star = await Star.create(req.body); // create new star

    res.status(201).json({
      success: true,
      data: star,
      message: `Created a new star!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to create star: ${error.message}`
    });
  }
};

// Update an existing resource
const update = async (req, res) => { // PUT (Update) BY ID
  try {
    const star = await Star.findByPk(req.params.id); // find by ID

    if (!star) {
      return res.status(404).json({
        success: false,
        message: `Star not found!`
      });
    }

    await star.update(req.body); // update core fields
    await star.setPlanets(req.body.planetIds); // many-to-many rel
  

    // Reload with relationships
    const updatedStar = await Star.findByPk(req.params.id, {
      include: [
        {
          model: Planet,
          through: { attributes: [] }
        },
        Galaxy
      ]
    });

    res.status(200).json({
      success: true,
      data: updatedStar,
      message: `Star updated successfully!`
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
    const star = await Star.findByPk(req.params.id); // find by ID

    if (!star) {
      return res.status(404).json({
        success: false,
        message: `Star not found!`
      });
    }

    await star.destroy(); // delete star

    res.status(204).json(true); // no content, success
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete star.`
    });
  }
};

module.exports = { index, show, create, update, remove };