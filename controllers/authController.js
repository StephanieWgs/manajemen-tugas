const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const authController = {
  register: async (req, res) => {
    const { name, username, password } = req.body;
    console.log("Menerima request register:", req.body);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password berhasil di-hash:", hashedPassword);
      const user_id = await User.create(name, username, hashedPassword);
      const token = generateToken(user_id);
      console.log("User berhasil dibuat dengan ID:", user_id);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Registrasi Gagal" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findId(username);
      if (!user) {
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      const token = generateToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Login Gagal" });
    }
  },
};

module.exports = authController;
