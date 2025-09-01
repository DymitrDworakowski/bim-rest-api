const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

// 🔑 Логін адміна
async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await admin.checkPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    admin.token = token;
    admin.lastLogin = new Date();
    await admin.save();

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// 🚪 Логаут
async function logout(req, res) {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.token = null;
    await admin.save();

    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 👤 Профіль адміна
async function profile(req, res) {
  try {
    const admin = await Admin.findById(req.user.id).select("-password -token");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// 🔹 Експорт усіх функцій
module.exports = { login, logout, profile };
