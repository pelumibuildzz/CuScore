const Admin = require("../models/admin-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const saltRounds = 10;

class AdminService {
  async registerAdmin(adminData) {
    const { username, email, password } = adminData;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const isEmail = this.isEmail(email);
    if (!isEmail) {
      throw new Error("Invalid Email");
    }

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    if (!newAdmin) {
      throw new Error("Error creating new admin");
    }
    newAdmin.save();
    return newAdmin;
  }

  async loginAdmin(adminData) {
    const { email, password } = adminData;
    const adminExsist = await Admin.findOne({ email });
    const isEmail = this.isEmail(email);
    if (!isEmail) {
      throw new Error("Invalid Email");
    }
    if (!adminExsist) {
      throw new Error("Admin does not exist");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      adminExsist.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorrect Password");
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
