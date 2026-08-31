const express = require("express");
const cors = require("cors");

const activitiesRouter = require("./routes/activities");
const footprintRouter = require("./routes/footprint");
const { ACTIVITY_TYPES } = require("./emissionFactors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/activity-types", (req, res) => {
  res.json({ activityTypes: ACTIVITY_TYPES });
});

app.use("/api/activities", activitiesRouter);
app.use("/api/footprint", footprintRouter);

// Stubbed features (not implemented in this build): weekly target & history filtering.
app.get("/api/target", (req, res) => {
  res.status(501).json({ error: "not_implemented", message: "Weekly target is not implemented in this build." });
});
app.post("/api/target", (req, res) => {
  res.status(501).json({ error: "not_implemented", message: "Weekly target is not implemented in this build." });
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal_error", message: "Something went wrong." });
});

module.exports = app;
