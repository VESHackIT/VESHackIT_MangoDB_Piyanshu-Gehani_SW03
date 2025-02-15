const Project = require("../models/Project");
const Investor = require("../models/Investor");
const Founder = require("../models/Founder");

const createProject = async (req, res) => {
  try {
    const founderName = req.body.founderName;
    const founder = await Founder.findOne({ name: founderName });
    if (!founder) {
      return res.status(404).json({ error: "Founder not found" });
    }
    const founderId = founder._id;
    const project = await Project.create({ ...req.body, founder: founderId });
    // const project = await Project.create(req.body);
    return res.status(201).json({ project });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
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
