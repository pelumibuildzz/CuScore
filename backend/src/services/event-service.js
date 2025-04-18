const { createError } = require("../middlewares/error-handler");
const Event = require("../models/event-model");
const mongoose = require("mongoose");

class EventService {
  async createEvent(eventData, next) {
    let { year, matchId, playerId, teamId, minute, type } = eventData;
    if ((!year, !matchId || !playerId || !teamId || !minute || !type))
      return next(
        createError("All Fields are Required", 400, {
          fields: ["matchId", "playerId", "teamId", "minute", "type"],
        })
      );

    if (
      !mongoose.Types.ObjectId.isValid(matchId) ||
      !mongoose.Types.ObjectId.isValid(playerId) ||
      !mongoose.Types.ObjectId.isValid(teamId)
    )
      return next(createError("one of the Id's format is Invalid", 400));

    let newEvent = new Event({
      year,
      matchId,
      playerId,
      teamId,
      minute,
      type,
    });
    newEvent.save();
    if (!newEvent) return next(createError("Error Creating Event", 404));
    return newEvent;
  }

  async getAllEvents(year, next) {
    let eventList = await Event.find({ year }).sort({ createdAt: 1 });
    if (!eventList && eventList != [])
      return next(createError("Error fetching Events", 500));
    return eventList;
  }

  async getAllEventsByTeam(teamId, next) {
    if (!teamId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));
    let eventList = await Event.find({ teamId });
    if (!eventList && eventList != [])
      return next(createError("Error fetching Events", 500));
    return eventList;
  }

  async getAllCurrentEventsByTeam(year, teamId, next) {
    if (!year || !teamId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));
    let eventList = await Event.find({ year, teamId });
    if (!eventList && eventList != [])
      return next(createError("Error fetching Events", 500));
    return eventList;
  }

  async getEventsByMatch(matchId, next) {
    if (!matchId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(matchId))
      return next(createError("Invalid Id Format", 400));
    let eventList = await Event.find({ matchId });
    if (!eventList && eventList != [])
      return next(createError("Error fetching Events", 500));
    return eventList;
  }

  async getAllEventsByPlayer(playerId, next) {
    if (!playerId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(playerId))
      return next(createError("Invalid Id Format", 400));
    let eventList = await Event.find({ playerId });
    if (!eventList && eventList != [])
      return next(createError("Error fetching Events", 500));
    return eventList;
  }

  async getAllCurrentEventsByPlayer(year, playerId, next) {
    if (!year || !playerId) throw new Error("Year and Id are Required");
    if (!mongoose.Types.ObjectId.isValid(playerId))
      return next(createError("Invalid Id Format", 400));
    let eventList = await Event.find({ year, playerId });
    if (!eventList && eventList != [])
      return next(createError("Error fetching Events", 500));
    return eventList;
  }

  async getEventById(eventId, next) {
    if (!eventId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(eventId))
      return next(createError("Invalid Id Format", 400));
    let event = await Event.findById(eventId);
    if (!event) return next(createError("Error fetching Events", 404));
    return event;
  }

  async deleteEvent(eventId, next) {
    if (!eventId) return next(createError("Id is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(eventId))
      return next(createError("Invalid Id Format", 400));
    let deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) return next(createError("Error deleting Event", 500));
    return { msg: "Event Successfully Deleted" };
  }
}

module.exports = EventService;
