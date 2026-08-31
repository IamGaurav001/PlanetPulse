import { useState } from "react";
import { api } from "../api";

export default function LogActivityForm({ activityTypes, onLogged }) {
  const [type, setType] = useState("car");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState(null); // { kind: 'ok'|'warn'|'error', message }
  const [submitting, setSubmitting] = useState(false);

  const selected = activityTypes[type];

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      const { activity, warning } = await api.logActivity({ type, quantity: Number(quantity), date });
      onLogged(activity);
      setQuantity("");
      setStatus(
        warning
          ? { kind: "warn", message: `Logged (${activity.co2Kg} kg CO₂e) — ${warning}` }
          : { kind: "ok", message: `Logged: ${activity.co2Kg} kg CO₂e` }
      );
    } catch (err) {
      setStatus({ kind: "error", message: err.data?.message || err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Log an activity</h2>
      <div className="field-row">
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(activityTypes).map(([key, def]) => (
              <option key={key} value={key}>
                {def.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity {selected ? `(${selected.unit})` : ""}
          <input
            type="number"
            min="0"
            step="any"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={selected?.perUnit ? "e.g. 10" : "e.g. 1"}
          />
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <button type="submit" disabled={submitting || !quantity}>
        {submitting ? "Logging…" : "Log activity"}
      </button>
      {status && <p className={`status status-${status.kind}`}>{status.message}</p>}
    </form>
  );
}
