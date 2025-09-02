const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

// 🆕 Реєстрація адміна
async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    // Перевірка, чи вже існує адмін з таким email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Створення нового адміна
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    // Генерація токена
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    newAdmin.token = token;
    await newAdmin.save();

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

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
    next(err);
  }
}

// 🚪 Логаут
async function logout(req, res, next) {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.token = null;
    await admin.save();

    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

// 👤 Профіль адміна
async function profile(req, res, next) {
  try {
    const admin = await Admin.findById(req.user.id).select("-password -token");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    next(err);
  }
}

// 🔹 Експорт усіх функцій тільки через module.exports
module.exports = { login, logout, profile, register };
