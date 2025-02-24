// Database

const mysql = require("mysql2");
require("dotenv").config();

// Konfigurasi koneksi
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Test koneksi
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

module.exports = db;