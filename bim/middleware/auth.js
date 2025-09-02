const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);

  if (!tokenMatch) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = tokenMatch[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 👇 Шукаємо адміна
    const admin = await Admin.findById(decode.id).select("_id email role token isActive");
    if (!admin) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Account deactivated" });
    }

    if (admin.token !== token) {
      return res.status(401).json({ message: "Token invalid" });
    }

    // 👇 Додаємо дані в req.user
    req.user = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = auth;
