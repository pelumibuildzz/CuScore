const AdminService = require("../services/auth-service");
const adminService = new AdminService();
const { createError } = require("../middlewares/error-handler");

const registerAdminController = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let data = { username, email, password };
    let admin = await adminService.registerAdmin(data, next);
    console.log(admin);
    if (!admin) return next(createError("Error creating new admin", 500));
    res.status(200).json({
      data: {
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginAdminController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let data = { email, password };
    let admin = await adminService.loginAdmin(data, next);
    if (!admin) return next(createError("Error Logging in admin", 500));
    res.status(200).json({
      data: {
        token: admin.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerAdminController, loginAdminController };
