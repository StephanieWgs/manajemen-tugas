//Entry point backend

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routers
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));