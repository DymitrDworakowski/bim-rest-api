const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve images from /public/images -> available at http://localhost:PORT/images/...
app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// 👇 Імпорт роутів
const routerAdmin = require("./routes/admin");
const blogRoutes = require("./routes/blog");
const formRoutes = require("./routes/formRoutes"); // <-- додано

// 👇 Підключення роутів
app.use("/api/auth", routerAdmin);
app.use("/api/blog", blogRoutes);
app.use("/api/form", formRoutes); // <-- додано

// catch 404
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    ...(req.app.get("env") === "development" && { stack: err.stack }),
  });
});

module.exports = app;
