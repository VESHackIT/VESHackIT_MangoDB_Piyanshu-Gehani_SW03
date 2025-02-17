const express = require("express");
const router = express.Router();
// router.route("/").post(createUser);
// router.route("/:email/:pwd").get(findUser);

const {
  createProject,
  getProject,
  createFounder,
  getFounder,
  createInvestor,
  getInvestor,
  createMeeting,
  getAllProjects,
  getInvestorById
} = require("../controllers/handleLogin");

router.route("/project").post(createProject);
router.route("/project/:name").get(getProject);
router.route("/founder").post(createFounder);
router.route("/founder/:name").get(getFounder);
router.route("/investor").post(createInvestor);
router.route("/investor/:name").get(getInvestor);
router.route("/investor/:id").get(getInvestorById);
router.route("/meeting").post(createMeeting);
router.route("/allprojects").get(getAllProjects);



module.exports = router;
