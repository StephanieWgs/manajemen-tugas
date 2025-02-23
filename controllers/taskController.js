const Task = require("../models/taskModel");

const taskController = {
    createTask: async (req, res) => {
        const { title, category, deadline} = req.body;
        const user_id = req.user.id;
        try {
            const task_id = await Task.create(title, category, deadline, user_id);
            res.status(201).json({ message: "Tugas berhasil ditambahkan!", task_id });
        } catch (error) {
            res.status(500).json({ message: "Gagal menambahkan tugas..." });
        }
    },


    getTasks: async (req, res) => {
        const user_id = req.user.id;
        try {
            const tasks = await Task.findAllTasks(user_id);
            res.status(200).json({ tasks });
        } catch (error) {
            res.status(500).json({ message: "Gagal mengambil tugas..." });
        }
    },

    getTaskById: async (req, res) => {
        const { id } = req.params;
        try {
            const task = await Task.findTaskById(id);
            res.status(200).json({ task });
        } catch (error) {
            res.status(500).json({ message: "Gagal mengambil tugas..." });
        }
    },

    updateTask: async (req, res) => {
        const { id } = req.params;
        const { title, category, deadline, status } = req.body;
        try {
            await Task.update(id, title, category, deadline, status);
            res.status(200).json({ message: "Tugas berhasil diubah!" });
        } catch (error) {
            res.status(500).json({ message: "Gagal mengubah tugas..." });
        }
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        try {
            await Task.delete(id);
            res.status(200).json({ message: "Tugas berhasil dihapus!" });
        } catch (error) {
            res.status(500).json({ message: "Gagal menghapus tugas..." });
        }
    }
};

module.exports = taskController;