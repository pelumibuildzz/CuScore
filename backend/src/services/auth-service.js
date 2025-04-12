const Admin = require("../models/admin-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { createError } = require("../middlewares/error-handler");
dotenv.config();

const saltRounds = 10;

class AdminService {
  async registerAdmin(adminData, next) {
    const { username, email, password } = adminData;
    if (!username || !email || !password) {
      return next(createError("All fields are required", 400));
    }
    if (!this.isEmail(email)) {
      return next(createError("Invalid Email", 400));
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    if (!newAdmin) {
      return next(createError("Error creating new admin", 500));
    }
    newAdmin.save();
    return newAdmin;
  }

  async loginAdmin(adminData, next) {
    const { email, password } = adminData;
    const adminExsist = await Admin.findOne({ email });
    const isEmail = this.isEmail(email);
    if (!isEmail) {
      return next(createError("Invalid Email", 400));
    }
    if (!adminExsist) {
      return next(createError("Admin does not exist", 404));
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      adminExsist.password
    );
    if (!isPasswordCorrect) {
      return next(createError("Incorrect Password", 401));
    }
    const token = this.generateToken(adminExsist);
    return {
      token,
    };
  }

  isEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
  }
}

module.exports = AdminService;
