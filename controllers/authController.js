const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const { sendNotification } = require("../websocket");

const authController = {
  // Register
  register: async (req, res) => {
    const { name, username, password } = req.body;
    try {
      // Cek apakah username sudah digunakan
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        sendNotification("Username ini sudah digunakan. Silakan coba yang lain!");
        return res.status(400).json({ message: "Username sudah ada" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user_id = await User.create(name, username, hashedPassword);
      //   const token = generateToken(user_id);
      //   res.status(201).json({ token });
      sendNotification("Registrasi Berhasil! Silakan Login");
      res.status(201).json({ message: "Registrasi Berhasil! Silakan Login" });
    } catch (error) {
      res.status(500).json({ message: "Registrasi Gagal" });
    }
  },

  // Login
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      //Cek apakah user ditemukan
      if (!user) {
        sendNotification("Username atau Password Salah");
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      //Cek password apakah valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        sendNotification("Username atau Password Salah");
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      const token = generateToken(user.id);
      res.json({ token });
    } catch (error) {
      console.error("Error saat login:", error);
      res.status(500).json({ message: "Login Gagal" });
    }
  },

  // logout: (req, res) => {
  //   res.cookie("token", "", { expires: new Date(0), httpOnly: true }); // Hapus token dari cookie
  //   res.redirect("/");
  // },
};

module.exports = authController;
