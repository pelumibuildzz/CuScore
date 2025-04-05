const AdminService = require("../services/auth-service");
const adminService = new AdminService();

const registerAdminController = async (req, res) => {
  let { name, email, password } = req.body;
  let data = { name, email, password };
  let admin = await adminService.registerAdmin(data);
  if (!admin) return next(createError("Error creating new admin", 500));
  res.status(200).json({
    data: {
      name: admin.name,
      email: admin.email,
    },
  });
};

const loginAdminController = async (req, res) => {
  let { email, password } = req.body;
  let data = { email, password };
  let admin = await adminService.loginAdmin(data);
  if (!admin) return next(createError("Error Logging in admin", 500));
  res.status(200).json({
    data: {
      token: admin.token,
    },
  });
};

module.exports = { registerAdminController, loginAdminController };
