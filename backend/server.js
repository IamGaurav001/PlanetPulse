const express = require("express");
const cors = require("cors");

const activitiesRouter = require("./src/routes/activities");
const footprintRouter = require("./src/routes/footprint");
const { ACTIVITY_TYPES } = require("./src/emissionFactors");

const app = express();
const PORT = process.env.PORT || 4100;

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

app.listen(PORT, () => {
  console.log(`PlanetPulse API listening on http://localhost:${PORT}`);
});
