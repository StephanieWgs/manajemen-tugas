const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const taskMiddleware = require('../middlewares/taskMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.post("/tasks", taskMiddleware, taskController.createTask);
router.put("/tasks/:id", taskMiddleware, taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;