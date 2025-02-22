const db = require('../config/db');

const Task = {
    create: async( title, category, deadline, user_id) => {
        const [result] = await db.promise().query('INSERT INTO tasks (title, category, deadline, user_id) VALUES (?, ?, ?, ?)', [title, category, deadline, user_id]);
        return result.insertId;
    },
    findAllTasks: async(user_id) => {
        const [result] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
        return result;
    },

    update: async(id, title, category, deadline, status) => {
        await db.promise().query('UPDATE tasks SET title = ?, category = ?, deadline = ?, status = ? WHERE id = ?', [title, category, deadline, status, id]);
    },

    delete: async(id) => {
        await db.promise().query('DELETE FROM tasks WHERE id = ?', [id]);
    }
}

module.exports = Task;