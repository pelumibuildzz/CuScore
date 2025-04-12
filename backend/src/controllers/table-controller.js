const TableService = require("../services/table-service");
const tableService = new TableService();
const { createError } = require("../middlewares/error-handler");

const dotenv = require("dotenv");
dotenv.config();
const currentYear = process.env.CURRENT_YEAR;

const createTableController = async (req, res, next) => {
  try {
    const { group, teamList } = req.body;
    let year = currentYear;
    let newTable = await tableService.createTable(
      year,
      { group, teamList },
      next
    );
    if (!newTable) return next(createError("Error Creating Table", 500));
    res.status(200).json({ newTable });
  } catch (error) {
    next(error);
  }
};

const getCurrentTablesController = async (req, res, next) => {
  try {
    let year = req.query.year || currentYear;
    let tableList = await tableService.getTablesByYear(year, next);
    if (!tableList) return next(createError("Error fetching tables", 500));
    res.status(200).json(tableList);
  } catch (error) {
    next(error);
  }
};

const getTableByIdController = async (req, res, next) => {
  try {
    let { tableId } = req.params;
    let table = await tableService.getTableById(tableId, next);
    if (!table) return next(createError("Error fetching tables", 500));
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

const updateTableController = async (req, res, next) => {
  try {
    let { tableId } = req.params;
    let { matchData } = req.body;
    let updatedTable = await tableService.updateTableStats(
      tableId,
      matchData,
      next
    );
    if (!updatedTable)
      return next(createError("Error updating table stats", 500));
    res.status(200).json(updatedTable);
  } catch (error) {
    next(error);
  }
};

const deleteTableController = async (req, res, next) => {
  try {
    let { tableId } = req.params;
    let deletedTable = await tableService.deleteTable(tableId, next);
    if (!deletedTable) return next(createError("Error delteing Table", 500));
    res.status(200).json(deletedTable);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTableController,
  getCurrentTablesController,
  getTableByIdController,
  deleteTableController,
  updateTableController,
};
