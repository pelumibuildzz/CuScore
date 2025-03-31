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
router.get("/:id", getTeamByIdController);
router.put("/:id", authenticateUserwebtoken, updatedTeamController);
router.delete("/:id", authenticateUserwebtoken, deleteTeamController);

module.exports = router;
