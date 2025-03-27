const AdminService = require("../services/authService");
const adminService = new AdminService();

const registerAdminController = async (req, res) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) throw new Error("All fields are required");
  let data = { name, email, password };
  let admin = await adminService.registerAdmin(data);
  if (!admin) throw new Error("Error creating admin");
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
  if (!admin) throw new Error("Error Logging in admin");
  res.status(200).json({
    data: {
      token: admin.token,
    },
  });
};
