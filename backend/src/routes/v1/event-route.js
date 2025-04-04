const express = require("express");
const { authenticateUserwebtoken } = require("../../middlewares/auth-webtoken");
const {
  createEventController,
  getAllEventsController,
  getEventsByTeamController,
  getEventsByMatchController,
  getEventsByPlayerController,
  deleteEventByIdController,
  getEventByIdController,
} = require("../../controllers/event-controller");
const router = express.Router();

router.use(express.json);
router.use(express.urlencoded({ extended: true }));

router.post("/", authenticateUserwebtoken, createEventController);
router.get("/", getAllEventsController);
router.get("/team/:teamId", getEventsByTeamController);
router.get("/match/:matchId", getEventsByMatchController);
router.get("/player/:playerId", getEventsByPlayerController);
router.get("/:eventId", authenticateUserwebtoken, getEventByIdController);
router.delete("/:eventId", authenticateUserwebtoken, deleteEventByIdController);

module.exports = router;
