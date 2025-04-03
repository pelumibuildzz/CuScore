const Event = require("../models/event-model");
const mongoose = require("mongoose");

class EventService {
  async createEvent(eventData) {
    let { year, matchId, playerId, teamId, minute, type } = eventData;
    if ((!year, !matchId || !playerId || !teamId || !minute || !type))
      throw new Error(
        "All fields are Requried: matchId, playerId, teamId, minute, type"
      );

    if (
      !mongoose.Types.ObjectId.isValid(matchId) ||
      !mongoose.Types.ObjectId.isValid(playerId) ||
      !mongoose.Types.ObjectId.isValid(teamId)
    )
      throw new Error("one of the Id's format is Invalid");

    let newEvent = new Event({
      matchId,
      playerId,
      teamId,
      minute,
      type,
    });
    if (!newEvent) throw new Error("Error Creating Event");
    return newEvent;
  }

  async getAllEvents() {
    let eventList = await Event.find({});
    if (!eventList && eventList != []) throw new Error("Error fetching Events");
    return eventList;
  }

  async getAllEventsByTeam(teamId) {
    if (!teamId) throw new Error("Id are Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Id format is incorrect");
    let eventList = await Event.find({ teamId });
    if (!eventList && eventList != []) throw new Error("Error fetching Events");
    return eventList;
  }

  async getAllCurrentEventsByTeam(year, teamId) {
    if (!year || !teamId) throw new Error("Year and Id are Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Id format is incorrect");
    let eventList = await Event.find({ year, teamId });
    if (!eventList && eventList != []) throw new Error("Error fetching Events");
    return eventList;
  }

  async getEventsByMatch(matchId) {
    if (!matchId) throw new Error("Id are Required");
    if (!mongoose.Types.ObjectId.isValid(matchId))
      throw new Error("Id format is incorrect");
    let eventList = await Event.find({ matchId });
    if (!eventList && eventList != []) throw new Error("Error fetching Events");
    return eventList;
  }

  async getAllEventsByPlayer(playerId) {
    if (!playerId) throw new Error("Id are Required");
    if (!mongoose.Types.ObjectId.isValid(playerId))
      throw new Error("Id format is incorrect");
    let eventList = await Event.find({ playerId });
    if (!eventList && eventList != []) throw new Error("Error fetching Events");
    return eventList;
  }

  async getAllCurrentEventsByPlayer(year, playerId) {
    if (!year || !playerId) throw new Error("Year and Id are Required");
    if (!mongoose.Types.ObjectId.isValid(playerId))
      throw new Error("Id format is incorrect");
    let eventList = await Event.find({ year, playerId });
    if (!eventList && eventList != []) throw new Error("Error fetching Events");
    return eventList;
  }

  async getEventById(eventId) {
    if (!eventId) throw new Error("eventId is Required");
    if (!mongoose.Types.ObjectId.isValid(eventId))
      throw new Error("Invalid Id format");
    let event = await Event.findById(eventId);
    if (!event) throw new Error("No event found or Error finding Event");
    return event;
  }

  async deleteEvent(eventId) {
    if (!eventId) throw new Error("eventId is Required");
    if (!mongoose.Types.ObjectId.isValid(eventId))
      throw new Error("Invalid Id format");

    let deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) throw new Error("Error deleting Event");
    return { msg: "Event Successfully Deleted" };
  }
}
