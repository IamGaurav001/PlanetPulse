const express = require("express");
const { readAll } = require("../store");

const router = express.Router();

// GET /api/footprint - total footprint + per-category breakdown (dashboard data)
router.get("/", (req, res) => {
  const activities = readAll();

  const totalKg = Number(activities.reduce((sum, a) => sum + a.co2Kg, 0).toFixed(3));

  const byCategory = {};
  const byType = {};
  for (const a of activities) {
    byCategory[a.category] = Number(((byCategory[a.category] || 0) + a.co2Kg).toFixed(3));
    byType[a.type] = Number(((byType[a.type] || 0) + a.co2Kg).toFixed(3));
  }

  res.json({
    totalKg,
    activityCount: activities.length,
    byCategory,
    byType,
  });
});

module.exports = router;
