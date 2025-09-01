const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");
const auth = require("../middleware/auth");

// Логін/логаут
router.post("/login", adminControllers.login);
router.post("/logout", auth, adminControllers.logout);

// Профіль
router.get("/profile", auth, adminControllers.profile);

module.exports = router;
