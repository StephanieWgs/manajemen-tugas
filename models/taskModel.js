const db = require("../config/db");

const Task = {
  // Tambah tugas
  create: async (title, category, deadline, user_id) => {
    const [result] = await db.promise().query("INSERT INTO tasks (title, category, deadline, user_id) VALUES (?, ?, ?, ?)", [title, category, deadline, user_id]);
    return result.insertId;
  },
  // Ambil semua tugas
  findAllTasks: async (user_id) => {
    const [result] = await db.promise().query("SELECT * FROM tasks WHERE user_id = ?", [user_id]);
    return result;
  },
  // Ambil tugas berdasarkan ID
  findTaskById: async (id) => {
    const [result] = await db.promise().query("SELECT * FROM tasks WHERE id = ?", [id]);
    return result[0];
  },

  // Ubah tugas
  update: async (id, title, category, deadline, status) => {
    await db.promise().query("UPDATE tasks SET title = ?, category = ?, deadline = ?, status = ? WHERE id = ?", [title, category, deadline, status, id]);
  },

  // Hapus tugas
  delete: async (id) => {
    await db.promise().query("DELETE FROM tasks WHERE id = ?", [id]);
  },
};

module.exports = Task;
