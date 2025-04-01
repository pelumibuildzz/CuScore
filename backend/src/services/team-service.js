const Team = require("../models/team-model");
const mongoose = require("mongoose");

class TeamService {
  async createTeam(teamData) {
    const { name, logo } = teamData;
    if (!name || !logo) throw new Error("All fields are required");
    const newTeam = new Team({
      name,
      logo,
    });
    if (!newTeam) throw new Error("Error creating new team");
    await newTeam.save();
    return newTeam;
  }

  async getAllTeams() {
    let teamList = await Team.find({});
    if (!teamList && teamList != [])
      throw new Error("Teams haven't been added or Error fetching teams");
    return teamList;
  }

  async getTeamById(teamId) {
    let team = await Team.findById(teamId);
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Invalid Id Format");
    if (!team) throw new Error("Team not found");
    return team;
  }

  async updateTeam(teamId, teamData) {
    if (!teamId) throw new Error("TeamId is Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Invalid Id Format");
    const { name, logo } = teamData;
    if (!name || !logo) throw new Error("All fields are required");
    let updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { name, logo },
      { new: true }
    );
    if (!updatedTeam) throw new Error("Error updating team");
    return updatedTeam;
  }

  async deleteTeam(teamId) {
    if (!teamId) throw new Error("TeamId is Required");
    if (!mongoose.Types.ObjectId.isValid(teamId))
      throw new Error("Invalid Id Format");
    let deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) throw new Error("Error deleting team");
    return { msg: "Team deleted successfully" };
  }
}

module.exports = TeamService;
