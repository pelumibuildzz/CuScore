const express = require("express");
const {
  getAllTeamsController,
  createTeamController,
  getTeamByIdController,
  updatedTeamController,
  deleteTeamController,
} = require("../../controllers/team-controller");
const { authenticateUserwebtoken } = require("../../middlewares/auth-webtoken");
const router = express.Router();

router.use(express.json);
router.use(express.urlencoded({ extended: true }));

router.get("/", getAllTeamsController);
router.post("/", authenticateUserwebtoken, createTeamController);
router.get("/:teamId", getTeamByIdController);
router.put("/:teamId", authenticateUserwebtoken, updatedTeamController);
router.delete("/:teamId", authenticateUserwebtoken, deleteTeamController);

module.exports = router;
