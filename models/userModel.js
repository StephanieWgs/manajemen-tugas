const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  // Tambah user
  create: async (name, username, password) => {
    const [result] = await db.promise().query("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", [name, username, password]);
    return result.insertId; // Mengembalikan ID user
  },
  // Ambil user berdasarkan username
  findByUsername: async (username) => {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0]; // Mengembalikan objek user
  },
};

module.exports = User;
