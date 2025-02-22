const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  create: async (name, username, password) => {
    const [result] = await db.promise().query("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", [name, username, password]);
    return result.insertId;
  },
  findByUsername: async (username) => {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
  },
};

module.exports = User;
