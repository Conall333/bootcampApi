const Bootcamp = require("../models/Bootcamp");

// controler file for bootcamp routes

// @disc  Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ sucess: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

// @disc  Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ sucess: false });
    }

    res.status(200).json({ sucess: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

// @disc  Create new Bootcamp
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ sucess: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ sucess: false });
  }
};

// @disc Update Bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return res.status(400).json({ sucess: false });
    }

    res.status(200).json({ sucess: true, data: bootcamp });
  } catch (err) {
    return res.status(400).json({ sucess: false });
  }
};

// @disc Delete Bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ sucess: false });
    }

    res.status(200).json({ sucess: true });
  } catch (err) {
    return res.status(400).json({ sucess: false });
  }
};
