const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require("../middleware/auth");
const { requireRole } = require("../middleware/auth");

// Публічні
router.get("/", blogController.getAll);
router.get("/:slug", blogController.getOne);

// Тільки адмін
router.post("/", auth, requireRole("admin"), blogController.add);
router.put("/:id", auth, requireRole("admin"), blogController.update);
router.delete("/:id", auth, requireRole("admin"), blogController.remove);

module.exports = router;
