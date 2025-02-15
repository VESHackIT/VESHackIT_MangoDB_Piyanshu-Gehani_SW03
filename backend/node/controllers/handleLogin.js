const Project = require("../models/Project");
const Investor = require("../models/Investor");
const Founder = require("../models/Founder");

const createProject = async (req, res) => {
  try {
    const founder = await Founder.findOne({ name: req.body.founderName });

    if (!founder) {
      return res.status(404).json({ error: "Founder not found" });
    }

    console.log("Founder before project creation:", founder);

    // Create the project
    const project = new Project({ ...req.body, founder: founder._id });
    await project.save(); // Save project explicitly

    // Push new project ID to the founder's `projects` array and save
    founder.projects.push(project);
    await founder.save();

    console.log("Founder after project update:", await Founder.findById(founder._id));

    return res.status(201).json({ project, message: "Project created and added to founder" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};



const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ name: req.params.name });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ project });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};

const createFounder = async (req, res) => {
  try {
    const founder = await Founder.create(req.body);
    return res.status(201).json({ founder });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

const getFounder = async (req, res) => {
  try {
    const founder = await Founder.findOne({ name: req.params.name });
    if (!founder) {
      return res.status(404).json({ message: "Founder not found" });
    }
    return res.status(200).json({ founder });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};

const createInvestor = async (req, res) => {
  try {
    const investor = await Investor.create(req.body);
    return res.status(201).json({ investor });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

const getInvestor = async (req, res) => {
  try {
    const investor = await Investor.findOne({ name: req.params.name });
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    return res.status(200).json({ investor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
};

module.exports = {
  createProject,
  getProject,
  createFounder,
  getFounder,
  createInvestor,
  getInvestor,
};
