const express = require("express");
const {
  getAllPlayersController,
  getPlayerByIdController,
  getPlayerByTeamIdController,
  updatePlayerController,
  deletePlayerController,
  createPlayerController,
} = require("../../controllers/player-controller");
const { authenticateUserwebtoken } = require("../../middlewares/auth-webtoken");
const router = express.Router();

router.use(express.json);
router.use(express.urlencoded({ extended: true }));

router.post("/", authenticateUserwebtoken, createPlayerController);
router.get("/", getAllPlayersController);
router.get("/:id", getPlayerByIdController);
router.get("/team/:teamId", getPlayerByTeamIdController);
router.put("/:id", authenticateUserwebtoken, updatePlayerController);
router.delete("/:id", authenticateUserwebtoken, deletePlayerController);

module.exports = router;
