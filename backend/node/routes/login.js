const express = require("express");
const router = express.Router();
const { createUser, findUser } = require("../controllers/login");
// router.route("/").post(createUser);
// router.route("/:email/:pwd").get(findUser);

const {
  createProject,
  getProject,
  createFounder,
  getFounder,
  createInvestor,
  getInvestor,
} = require("../controllers/handleLogin");

router.route("/project").post(createProject);
router.route("/project/:name").get(getProject);
router.route("/founder").post(createFounder);
router.route("/founder/:name").get(getFounder);
router.route("/investor").post(createInvestor);
router.route("/investor/:name").get(getInvestor);

module.exports = router;
