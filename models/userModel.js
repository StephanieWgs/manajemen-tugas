const db = require('../config/db');
const bcrypt = require("bcryptjs");

const User = {
    create: async(name, username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [name, username, hashedPassword]);
        return result.insertId;
    },
    findId: async(username) => {
        const result = await db.query('SELECT id FROM users WHERE username = ?', [username]);
        return result[0];
    },
    findName: async(id) => {
        const result = await db.query('SELECT name FROM users WHERE id = ?', [id]);
        return result[0];
    }
}

module.exports = User;