//Entry point backend

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const http = require("http");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Websocket
const { initWebSocket } = require("./websocket");
initWebSocket(server);

//Set EJS sebagai view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Menyajikan folder public sebagai folder statis
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); // Tambahkan ini jika request dari form HTML
app.use(express.json());

// Routers
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Rute halaman
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

server.listen(port, () => console.log(`Server running on port ${port}`));