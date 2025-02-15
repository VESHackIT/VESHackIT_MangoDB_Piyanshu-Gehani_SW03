const Project = require("../models/Project");
const Investor = require("../models/Investor");
const Founder = require("../models/Founder");
const fundProject = async (req, res) => {
  try {
    const { projName, investorName, fundAmt } = req.body;

    // Find the project
    const project = await Project.findOne({ name: projName });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Find the investor
    const investor = await Investor.findOne({ name: investorName });
    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }

    // Update project: Increase raisedAmount and add investor if not already in list
    project.raisedAmount += fundAmt;
    if (!project.investors.includes(investor._id)) {
      project.investors.push(investor._id);
    }
    await project.save();

    // Update investor: Increase totFunds and log investment
    investor.totFunds += fundAmt;
    investor.investments.push({ project: project._id, amount: fundAmt });
    await investor.save();

    return res.status(200).json({
      message: "Funding successful",
      project,
      investor,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};
module.exports = { fundProject };
