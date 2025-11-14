const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

async function connect() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose
    .connect(DB_URI)
    .then(() => console.log("Database connection successfully"))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { connect };
