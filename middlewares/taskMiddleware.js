//Validasi data sebelum masuk ke database

const taskMiddleware = (req, res, next) => {
  // Validasi field untuk tambah dan update
  const { title, category, deadline, status } = req.body;
  if (!title || !category || !deadline) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  // Validasi tanggal deadline, deadline paling minimal hari ini
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set waktu ke 00:00:00 pada hari ini
  if (new Date(deadline).getTime() < today.getTime()) {
    return res.status(400).json({ message: "Deadline harus hari ini atau lebih!" });
  }

  // Validasi status hanya untuk update task, bukan tambah
  if (req.method === "PUT" && !status) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }
  next();
};

module.exports = taskMiddleware;
