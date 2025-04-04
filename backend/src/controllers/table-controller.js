const TableService = require("../services/table-service");
const tableService = new TableService();

const currentYear = process.CURRENT_YEAR;

const createTableController = async (req, res) => {
  const { group, teamList } = req.body;
};
