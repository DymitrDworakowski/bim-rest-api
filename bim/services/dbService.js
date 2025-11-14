const mongoose = require("mongoose");
const Client = require("../models/clientModel");

const uri = process.env.DB_URI || "mongodb://localhost:27017/bim_rest_api";

// Спробуємо підключити існуючий модуль з папки db (якщо є)
let dbModule = null;
try {
  dbModule = require("../db/db"); // перевірити шлях: ../db або ../db/index.js
} catch (e) {
  dbModule = null;
}

let connected = false;
async function connect() {
  if (connected) return;

  // Якщо модуль db експортує функцію connect — використати її
  if (dbModule && typeof dbModule.connect === "function") {
    await dbModule.connect();
    connected = true;
    console.log("MongoDB connected via ../db module");
    return;
  }

  // Інакше — підключаємося напряму через mongoose
  if (mongoose.connection.readyState === 1) {
    connected = true;
    return;
  }
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connected = true;
  console.log("MongoDB connected (direct)");
}

async function saveClient({ courseName, firstName, lastName, email, phone }) {
  await connect();
  const client = new Client({ courseName, firstName, lastName, email, phone });
  await client.save();
  return client;
}

module.exports = { saveClient, connect };
