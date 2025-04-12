const Team = require("../models/team-model");
const mongoose = require("mongoose");
const { createError } = require("../middlewares/error-handler");

class TeamService {
  async createTeam(teamData, next) {
    const { name, logo } = teamData;
    if (!name || !logo)
      return next(createError("All fields are required", 400));
    const newTeam = new Team({ name, logo });
    if (!newTeam) return next(createError("Error creating new team", 500));
    await newTeam.save();
    return newTeam;
  }

  async getAllTeams(next) {
    let teamList = await Team.find({});
    if (!teamList && teamList != [])
      return next(
        createError("Teams haven't been added or Error fetching teams", 404)
      );
    return teamList;
  }

  async getTeamById(teamId, next) {
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));
    let team = await Team.findById(teamId);
    if (!team) return next(createError("Team not found", 404));
    return team;
  }

  async updateTeam(teamId, teamData, next) {
    if (!teamId) return next(createError("TeamId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));
    if (!teamData) return next(createError("Team data is required", 400));
    const { name, logo } = teamData;
    console.log(teamData);
    if (!name && !logo)
      return next(createError("At least one field is required", 400));
    let updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { ...(name && { name }), ...(logo && { logo }) },
      { new: true }
    );
    if (!updatedTeam) return next(createError("Error updating team", 500));
    return updatedTeam;
  }

  async deleteTeam(teamId, next) {
    if (!teamId) return next(createError("TeamId is Required", 400));
    if (!mongoose.Types.ObjectId.isValid(teamId))
      return next(createError("Invalid Id Format", 400));
    let deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) return next(createError("Error deleting team", 500));
    return { msg: "Team deleted successfully" };
  }
}

module.exports = TeamService;
