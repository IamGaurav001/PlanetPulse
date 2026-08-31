const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "data", "activities.json");

function readAll() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, "utf8").trim();
  return raw ? JSON.parse(raw) : [];
}

function writeAll(activities) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(activities, null, 2), "utf8");
}

module.exports = { readAll, writeAll };
