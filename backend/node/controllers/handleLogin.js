const Project = require("../models/Project");
const Investor = require("../models/Investor");
const Founder = require("../models/Founder");
const Meeting = require("../models/Meeting");

const createProject = async (req, res) => {
  try {
    const founderName = req.body.founderName;
    const founder = await Founder.findOne({ name: founderName });
    if (!founder) {
      return res.status(404).json({ error: "Founder not found" });
    }

    const founderId = founder._id;
    const project = await Project.create({ ...req.body, founder: founderId });

    // Recalculate impact_score for the founder
    const newImpactScore = founder.projects.length * 10 + project.fundingGoal; // Example scoring logic
    founder.impact_score = newImpactScore;

    // Add project ID to founder's projects array
    founder.projects.push(project._id);
    await founder.save();

    return res.status(201).json({ project });
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

    // Fetch full project details
    const projects = await Project.find({ _id: { $in: founder.projects } }).select("-__v -updatedAt");

    // Fetch full meeting details
    const meetings = await Meeting.find({ _id: { $in: founder.meetings } }).select("-__v -updatedAt");

    // Convert founder document to plain object and replace projects & meetings array
    const founderData = founder.toObject();
    founderData.projects = projects;
    founderData.meetings = meetings;

    return res.status(200).json({ founder: founderData });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
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


const createMeeting = async (req, res) => {
  try {
    const { founderName, investorNames, title, date, startTime, endTime, keyPoints } = req.body;

    // Find the founder
    const founder = await Founder.findOne({ name: founderName });
    if (!founder) {
      return res.status(404).json({ error: "Founder not found" });
    }

    // Find the investors
    const investors = await Investor.find({ name: { $in: investorNames } });
    if (investors.length !== investorNames.length) {
      return res.status(404).json({ error: "One or more investors not found" });
    }

    console.log("Founder before meeting creation:", founder);

    // Create the meeting
    const meeting = new Meeting({
      title,
      date,
      startTime,
      endTime,
      keyPoints,
      founder: founder._id,
      investors: investors.map((inv) => inv._id),
      sentiment: "Neutral" // Default value
    });

    await meeting.save(); // Save the meeting explicitly

    // Push the meeting ID to the founder's `meetings` array and save
    if (!founder.meetings) {
      founder.meetings = [];
    }
    founder.meetings.push(meeting._id);
    await founder.save();

    console.log("Founder after meeting update:", await Founder.findById(founder._id));

    return res.status(201).json({ meeting, message: "Meeting created successfully and linked to founder" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};


module.exports = {
  createProject,
  getProject,
  createFounder,
  getFounder,
  createInvestor,
  getInvestor,
  createMeeting,
};
