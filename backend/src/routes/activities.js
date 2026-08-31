const express = require("express");
const crypto = require("crypto");
const { ACTIVITY_TYPES, calculateCo2Kg, isSuspicious } = require("../emissionFactors");
const { readAll, writeAll } = require("../store");

const router = express.Router();

// POST /api/activities - log an activity
router.post("/", (req, res) => {
  const { type, quantity, date } = req.body || {};

  if (!type || !ACTIVITY_TYPES[type]) {
    return res.status(400).json({
      error: "invalid_type",
      message: `type must be one of: ${Object.keys(ACTIVITY_TYPES).join(", ")}`,
    });
  }

  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({
      error: "invalid_quantity",
      message: "quantity must be a positive number",
    });
  }

  const def = ACTIVITY_TYPES[type];
  const co2Kg = calculateCo2Kg(type, qty);
  const suspicious = isSuspicious(type, qty);

  const activity = {
    id: crypto.randomUUID(),
    type,
    label: def.label,
    category: def.category,
    unit: def.unit,
    quantity: qty,
    co2Kg,
    suspicious,
    date: date || new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  };

  const activities = readAll();
  activities.push(activity);
  writeAll(activities);

  res.status(201).json({
    activity,
    warning: suspicious
      ? `This looks unusually high for ${def.label.toLowerCase()} (over ${def.sanityMax} ${def.unit}). It was still logged — please double-check the entry.`
      : null,
  });
});

// GET /api/activities - list all (history & filter is a stubbed feature, so this
// endpoint intentionally does NOT support query-param filtering yet)
router.get("/", (req, res) => {
  const activities = readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json({ activities });
});

module.exports = router;
