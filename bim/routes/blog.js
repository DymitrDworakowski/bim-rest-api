const express = require("express");
const router = express.Router();
const blogControllers= require("../controllers/blogControllers");
const auth = require("../middleware/auth");
const  requireRole = require("../middleware/role");

// Публічні
router.get("/public",blogControllers.getPublic)
// router.get("/", blogControllers.getAll);
router.get("/:slug", blogControllers.getOne);

// Тільки адмін
router.get("/", auth, requireRole("admin"), blogControllers.getAll);
router.post("/", auth, requireRole("admin"), blogControllers.add);
router.put("/:id", auth, requireRole("admin"), blogControllers.update);
router.delete("/:id", auth, requireRole("admin"), blogControllers.remove);

module.exports = router;
