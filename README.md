# PlanetPulse

**Hackathon ID: AZIS-T5CS9T**

A carbon footprint tracker — turns daily choices (car trips, flights, electricity use, meals) into a visible CO₂ footprint with a live dashboard.

**Track:** Climate Tech

## ⚠️ Build status — testing build, not final submission

This is a **testing build**. Of the 5 required features, **3 are fully implemented and working**; the other 2 are visibly present in the UI but intentionally **not functional** (clearly labeled "Not implemented in this build"):

| # | Feature | Status |
|---|---|---|
| 1 | Log an activity | ✅ Working |
| 2 | CO₂ calculation | ✅ Working |
| 3 | Dashboard (total + per-category breakdown) | ✅ Working |
| 4 | Weekly target (set target, show progress, flag overage) | ❌ Not implemented (stub UI + `501` API responses) |
| 5 | History & filter (browse/filter logged activities) | ❌ Not implemented (raw list available via API only, no filtering) |

This does **not** meet the stated submission requirement of "all five required features" implemented — do not treat this build as final-submission-ready without adding features 4 and 5.

## Tech stack

- **Backend:** Node.js + Express, JSON file as the datastore (`backend/data/activities.json`)
- **Frontend:** React + Vite, plain CSS (no UI framework)
- No authentication / no database server — no test credentials are required.

## Standard API

**Yes**, a standard REST API is implemented (JSON over HTTP), so this track's features can be graded by script rather than requiring a browser agent to drive the UI.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/activity-types` | List activity types, units, and emission factors |
| `POST` | `/api/activities` | Log an activity — body: `{ "type": "car", "quantity": 10, "date": "2026-08-31" }` |
| `GET` | `/api/activities` | List all logged activities (no filtering — see status table above) |
| `GET` | `/api/footprint` | Total CO₂ footprint (kg) + breakdown by category and by type |
| `GET`/`POST` | `/api/target` | Stub — returns `501 Not Implemented` |
| `GET` | `/health` | Health check |

### Emission factors (fixed)

| Activity | Factor |
|---|---|
| Car | 0.20 kg CO₂ / km |
| Bus | 0.08 kg CO₂ / km |
| Flight | 0.25 kg CO₂ / km |
| Electricity | 0.80 kg CO₂ / kWh |
| Vegetarian meal | 0.5 kg CO₂ / meal |
| Non-vegetarian meal | 2.0 kg CO₂ / meal |

### Absurd-input handling

Entries above a generous per-type sanity threshold (e.g. car > 2000 km) are still logged and counted, but returned with `"suspicious": true` and a `warning` message. Zero/negative/non-numeric quantities are rejected with `400`. See [DECISIONS.md](DECISIONS.md) (DP2) for reasoning.

## Run steps

Requires Node.js 18+.

```bash
# Terminal 1 — backend (http://localhost:4100)
cd backend
npm install
npm start
```

```bash
# Terminal 2 — frontend (http://localhost:5173, or next free port)
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (e.g. `http://localhost:5173`). The frontend proxies `/api/*` to the backend on port 4100.

## Test credentials

None — the app has no login/auth.

## Decision points

See [DECISIONS.md](DECISIONS.md) for DP1 (the nudge), DP2 (absurd input), and DP3 (the week).
