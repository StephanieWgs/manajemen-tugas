// Middleware untuk Authentication

const { verifyToken } = require("../config/auth");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Akses Ditolak" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Simpam ID user ke dalam request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports = authMiddleware;