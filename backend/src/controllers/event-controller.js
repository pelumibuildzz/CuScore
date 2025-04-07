const EventService = require("../services/event-service");
const eventService = new EventService();
const { createError } = require("../middlewares/error-handler");

const dotenv = require("dotenv");
dotenv.config();
const currentYear = process.CURRENT_YEAR;

const createEventController = async (req, res) => {
  const { matchId, playerId, teamId, minute, type } = req.body;
  let newEvent = await eventService.createEvent({
    year: currentYear,
    matchId,
    playerId,
    teamId,
    minute,
    type,
  });
  if (!newEvent) return next(createError("Error Creating Event", 404));

  const io = req.app.get("io");
  io.emit("newEvent", newEvent);

  res.status(200).json(newEvent);
};

const getAllEventsController = async (req, res) => {
  const year = currentYear;
  let eventList = await eventService.getAllEvents(year);
  if (!eventList && eventList != [])
    return next(createError("Error fetching Events", 500));
  res.status(200).json(eventList);
};

const getEventsByTeamController = async (req, res) => {
  const { teamId } = req.params;
  let eventList = await eventService.getAllCurrentEventsByTeam(
    currentYear,
    teamId
  );
  if (!eventList) return next(createError("Error fetching Events", 500));
  res.status(200).json(eventList);
};

const getEventsByMatchController = async (req, res) => {
  const { matchId } = req.params;
  let eventList = await eventService.getEventsByMatch(matchId);
  if (!eventList) return next(createError("Error fetching Events", 500));
  res.status(200).json(eventList);
};

const getEventsByPlayerController = async (req, res) => {
  const { playerId } = req.params;
  let eventList = await eventService.getAllCurrentEventsByPlayer(
    currentYear,
    playerId
  );
  if (!eventList) return next(createError("Error fetching Events", 500));
  res.status(200).json(eventList);
};

const getAllEventsByTeamController = async (req, res) => {
  const { teamId } = req.params;
  let eventList = await eventService.getAllEventsByTeam(teamId);
  if (!eventList) return next(createError("Error fetching Events", 500));
  res.status(200).json(eventList);
};

const getAllEventsByPlayerController = async (req, res) => {
  const { playerId } = req.params;
  let eventList = await eventService.getAllEventsByPlayer(playerId);
  if (!eventList) return next(createError("Error fetching Events", 500));
  res.status(200).json(eventList);
};

const getEventByIdController = async (req, res) => {
  const { eventId } = req.params;
  let event = await eventService.getEventById(eventId);
  if (!event) return next(createError("Error fetching Events", 500));
  res.status(200).json(event);
};

const deleteEventByIdController = async (req, res) => {
  const { eventId } = req.params;
  let event = await eventService.deleteEvent(eventId);
  if (!event) return next(createError("Error fetching Events", 500));
  res.status(200).json(event);
};

module.exports = {
  createEventController,
  getAllEventsController,
  getEventsByTeamController,
  getEventsByMatchController,
  getEventsByPlayerController,
  getAllEventsByTeamController,
  getAllEventsByPlayerController,
  getEventByIdController,
  deleteEventByIdController,
};
