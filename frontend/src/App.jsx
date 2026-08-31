import { useEffect, useState, useCallback } from "react";
import { api } from "./api";
import LogActivityForm from "./components/LogActivityForm";
import Dashboard from "./components/Dashboard";
import StubFeature from "./components/StubFeature";

export default function App() {
  const [activityTypes, setActivityTypes] = useState(null);
  const [footprint, setFootprint] = useState(null);
  const [error, setError] = useState(null);

  const refreshFootprint = useCallback(async () => {
    try {
      const data = await api.getFootprint();
      setFootprint(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    api.getActivityTypes().then((d) => setActivityTypes(d.activityTypes)).catch((err) => setError(err.message));
    refreshFootprint();
  }, [refreshFootprint]);

  return (
    <div className="app">
      <header>
        <h1>🌍 PlanetPulse</h1>
        <p className="tagline">Turn daily choices into a visible carbon footprint.</p>
      </header>

      {error && <p className="status status-error">{error}</p>}

      <main>
        {activityTypes && <LogActivityForm activityTypes={activityTypes} onLogged={refreshFootprint} />}

        <Dashboard footprint={footprint} />

        <StubFeature
          title="Weekly target"
          description="Set a weekly CO₂ target and track progress against it. Not implemented in this build — see DECISIONS.md for the intended design (ISO week starting Monday, encouraging-tone nudge on exceeding target)."
        />

        <StubFeature
          title="History & filter"
          description="Browse logged activities, filterable by type and date. Not implemented in this build — the raw activity log is available via GET /api/activities."
        />
      </main>

      <footer>
        <p>PlanetPulse — testing build. Hackathon ID: APEX-2026</p>
      </footer>
    </div>
  );
}
