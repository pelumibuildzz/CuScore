const TeamService = require("../services/team-service");
const teamService = new TeamService();
const { createError } = require("../middlewares/error-handler");

const createTeamController = async (req, res, next) => {
  try {
    const { name, logo } = req.body;
    let newTeam = await teamService.createTeam({ name, logo }, next);
    if (!newTeam) next(createError("Error Creating Team", 500));
    res.status(200).json(newTeam);
  } catch (error) {
    next(error);
  }
};

const getAllTeamsController = async (req, res, next) => {
  try {
    const teamList = await teamService.getAllTeams(next);
    if (!teamList) next(createError("Error Fetching Teams", 500));
    res.status(200).json(teamList);
  } catch (error) {
    next(error);
  }
};

const getTeamByIdController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await teamService.getTeamById(teamId, next);
    if (!team)
      next(
        createError("Error Fetching Team. Make Sure TeamId is Correct", 500)
      );
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

const updatedTeamController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const { updateData } = req.body;
    const updatedTeam = await teamService.updateTeam(teamId, updateData, next);
    if (!updatedTeam) next(createError("Error Updating Team", 500));
    res.status(200).json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

const deleteTeamController = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const deletedTeam = await teamService.deleteTeam(teamId, next);
    if (!deletedTeam) next(createError("Error Deleting Team", 500));
    res.status(200).json(deletedTeam);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeamController,
  getAllTeamsController,
  getTeamByIdController,
  updatedTeamController,
  deleteTeamController,
};
