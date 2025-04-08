const express = require("express");
const { authenticateUserwebtoken } = require("../../middlewares/auth-webtoken");
const {
  createMatchController,
  getAllMatchesByYearController,
  getMatchByIdController,
  updateMatchController,
  deleteMatchController,
} = require("../../controllers/match-controller");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", authenticateUserwebtoken, createMatchController);
router.get("/", getAllMatchesByYearController);
router.get("/:matchId", getMatchByIdController);
router.put("/:matchId", authenticateUserwebtoken, updateMatchController);
router.delete("/:matchId", authenticateUserwebtoken, deleteMatchController);

module.exports = router;
