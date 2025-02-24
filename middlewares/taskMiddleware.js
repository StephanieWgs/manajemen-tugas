//Validasi data sebelum masuk ke database

const taskMiddleware = (req, res, next) => {
  // Validasi field untuk tambah dan update
  const { title, category, deadline, status } = req.body;
  if (!title || !category || !deadline) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  // Validasi tanggal
  if (new Date(deadline).getTime() <= Date.now()) {
    return res.status(400).json({ message: "Deadline harus lebih dari tanggal saat ini!" });
  }

  // Validasi status hanya untuk update task, bukan tambah
  if (req.method === "PUT" && !status) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }
  next();
};

module.exports = taskMiddleware;
