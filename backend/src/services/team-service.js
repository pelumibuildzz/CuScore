const Team = require("../models/team-model");

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
    let teamList = Team.find({});
    if (!teamList)
      throw new Error("Teams haven't been added or Error fetching teams");
    return teamList;
  }

  async getTeamById(temaId) {
    let team = Team.findById(temaId);
    if (!team) throw new Error("Team not found");
    return team;
  }

  async updateTeam(teamId, teamData) {
    const { name, logo } = teamData;
    if (!name || !logo) throw new Error("All fields are required");
    let updatedTeam = Team.findByIdAndUpdate(
      teamId,
      { name, logo },
      { new: true }
    );
    if (!updatedTeam) throw new Error("Error updating team");
    return updatedTeam;
  }

  async deleteTeam(teamId) {
    let deletedTeam = Team.findByIdAndDelete(teamId);
    if (!deletedTeam) throw new Error("Error deleting team");
    return { msg: "Team deleted successfully" };
  }
}

module.exports = TeamService;
