const CATEGORY_LABELS = {
  transport: "Transport",
  energy: "Energy",
  food: "Food",
};

const CATEGORY_COLORS = {
  transport: "#3b82f6",
  energy: "#f59e0b",
  food: "#22c55e",
};

export default function Dashboard({ footprint }) {
  if (!footprint) return null;

  const { totalKg, activityCount, byCategory } = footprint;
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const maxVal = Math.max(1, ...categories.map(([, v]) => v));

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <div className="total-row">
        <div>
          <span className="total-value">{totalKg.toFixed(2)}</span>
          <span className="total-unit">kg CO₂e</span>
        </div>
        <div className="total-sub">
          {activityCount} {activityCount === 1 ? "activity" : "activities"} logged
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="empty">No activities logged yet.</p>
      ) : (
        <>
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>kg CO₂e</th>
                <th>% of total</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(([cat, val]) => (
                <tr key={cat}>
                  <td>{CATEGORY_LABELS[cat] || cat}</td>
                  <td>{val.toFixed(2)}</td>
                  <td>{totalKg ? ((val / totalKg) * 100).toFixed(1) : "0.0"}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bar-chart">
            {categories.map(([cat, val]) => (
              <div className="bar-row" key={cat}>
                <span className="bar-label">{CATEGORY_LABELS[cat] || cat}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(val / maxVal) * 100}%`,
                      background: CATEGORY_COLORS[cat] || "#888",
                    }}
                  />
                </div>
                <span className="bar-value">{val.toFixed(1)} kg</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
