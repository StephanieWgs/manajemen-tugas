const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const authController = {
  register: async (req, res) => {
    const { name, username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user_id = await User.create(name, username, hashedPassword);
      const token = generateToken(user_id);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Registrasi Gagal" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      console.log("User dari database:", user);
      if (!user) {
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      const token = generateToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error saat login:", error);
      res.status(500).json({ message: "Login Gagal" });
    }
  },
};

module.exports = authController;
