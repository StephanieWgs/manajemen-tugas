const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const authController = {
  // Register
  register: async (req, res) => {
    const { name, username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user_id = await User.create(name, username, hashedPassword);
      //   const token = generateToken(user_id);
      //   res.status(201).json({ token });
      res.redirect("/"); // Redirect ke index.ejs untuk login
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
        return res.status(401).json({ message: "Username atau Password Salah" });
      }

      //Cek password apakah valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
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
